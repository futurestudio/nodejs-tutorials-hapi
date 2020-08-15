var Hapi = require('@hapi/hapi')
var Good = require('@hapi/good')

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
  handler: function (request, h) {
    return 'Hello Future Studio!'
  }
})

// register plugins to server instance
server.register({
  plugin: Good,
  options: {
    ops: {
      interval: 10000
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [ { log: '*', response: '*', request: '*', ops: '*' } ]
        },
        {
          module: '@hapi/good-console'
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
