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

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
})

// start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  server.log('info', 'Server running at: ' + server.info.uri)
})
