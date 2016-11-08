var Hapi = require('hapi')
var Good = require('good')

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
    register: require('./base-route')
  },
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
    throw err
  }

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      throw err
    }

    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
