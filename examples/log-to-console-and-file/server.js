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
    register: Good,
    options: {
      ops: {
        interval: 10000   // log 'ops' events every 10 seconds
      },
      reporters: {
        console: [
          { module: 'good-squeeze', name: 'Squeeze', args: [ { log: '*', response: '*', request: '*' } ] },
          { module: 'good-console' },
          'stdout'
        ],
        file: [
          { module: 'good-squeeze', name: 'Squeeze', args: [ { ops: '*' } ] },
          { module: 'good-squeeze', name: 'SafeJson' },
          { module: 'good-file', args: [ './logs/my_app_log.log' ] }
        ]
      }
    }
  },
  {
    register: require('./base-route')
  }
], function (err) {
  if (err) {
    throw err
  }

  server.log('info', 'Registered plugins')

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      throw err
    }

    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
