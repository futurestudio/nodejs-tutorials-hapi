'use strict'

const Hapi = require('hapi')
const Good = require('good')
const Vision = require('vision')
const Pug = require('pug')

// create new server instance
const server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([
  {
    register: Vision
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
    server.log('error', 'failed to install plugins')

    throw err
  }

  server.log('info', 'Plugins registered')

  /**
   * view configuration
   */
  server.views({
    engines: {
      pug: {
        compile: function (template, options) {
          const compile = Pug.compileFile(options.filename)

          return function (context) {
            return compile(context)
          }
        }
      }
    },
    path: __dirname + '/views'
  })
  server.log('info', 'View configuration completed')

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      const data = {
        title: 'Hapi Render Pug Views',
        message: 'Wohoo \\o/ Your view has been rendered successfully!'
      }

      reply.view('index', data)
    }
  })
  server.log('info', 'Route registered')

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
