var Hapi = require('hapi')
var Good = require('good')
var Vision = require('vision')
var Bcrypt = require('bcrypt')
var Users = require('./users-db')
var Handlebars = require('handlebars')
var BasicAuth = require('hapi-auth-basic')
var CookieAuth = require('hapi-auth-cookie')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([ Vision, BasicAuth, CookieAuth,
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
  }
], function (err) {
  if (err) {
    server.log('error', 'failed to install plugins')

    throw err
  }

  server.log('info', 'Plugins registered')

  /**
   * view configuration
   */
  server.views({
    engines: {
      html: Handlebars
    },
    path: __dirname + '/views',
    layout: true
  })
  server.log('info', 'View configuration completed')

  // validation function used for hapi-auth-basic
  var basicValidation = function (request, username, password, callback) {
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
      server.log('info', 'user authentication successful')
      callback(err, isValid, { id: user.id, name: user.name })
    })
  }

  server.auth.strategy('simple', 'basic', { validateFunc: basicValidation })
  server.log('info', 'Registered auth strategy: basic auth')

  // validation function used for hapi-auth-cookie: optional and checks if the user is still existing
  var cookieValidation = function (request, session, callback) {
    var username = session.username
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    server.log('info', 'user authenticated')
    callback(err, true, user)
  }

  server.auth.strategy('session', 'cookie', {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'future-studio-hapi-tutorials-cookie-auth-example',
    redirectTo: false,
    isSecure: false,
    validateFunc: cookieValidation
  })
  server.log('info', 'Registered auth strategy: cookie auth')

  // default auth strategy avoids server crash for routes that doesn’t specify auth config
  server.auth.default('simple')

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
