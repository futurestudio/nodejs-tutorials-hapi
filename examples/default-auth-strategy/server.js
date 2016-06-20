var Hapi = require('hapi')
var Good = require('good')
var Vision = require('vision')
var Bcrypt = require('bcrypt')
var Users = require('./users-db')
var BasicAuth = require('hapi-auth-basic')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([
  {
    register: Good,
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [ { log: '*', response: '*', request: '*' } ]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  },
  {
    register: BasicAuth
  }
], function (err) {
  if (err) {
    server.log('error', 'failed to install plugins')

    throw err
  }

  server.log('info', 'Plugins registered')

  var basicValidation  = function (request, username, password, callback) {
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
      server.log('info', 'user authentication successful')
      callback(err, isValid, user)
    })
  }

  // Create auth strategy:
  // 1. without setting it as default
  server.auth.strategy('basic', 'basic', { validateFunc: basicValidation })
  // set default auth strategy separately
  // all routes added afterwards will follow the default, required auth strategy
  server.auth.default('basic')

  // 2. set it as default
  // all routes will automatically require and follow the default strategy
  // server.auth.strategy('basic', 'basic', true, { validateFunc: basicValidation })

  server.log('info', 'Registered auth strategy: basic auth')

  var routes = require('./routes')
  server.route(routes)
  server.log('info', 'Routes registered')

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log('error', 'failed to start server')
      server.log('error', err)

      throw err
    }

    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
