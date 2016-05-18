var Hapi = require('hapi')
var Good = require('good')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// add “hello world” route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello Future Studio!')
  }
})

// register plugins to server instance
server.register({
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
})

// start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  server.log('info', 'Server running at: ' + server.info.uri)
})
