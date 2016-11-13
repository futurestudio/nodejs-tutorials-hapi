'use strict'

const baseRoutes = {
  register: function (server, options, next) {
    // add defined route to hapi server
    server.route([
      {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply('Did the work :)')
        }
      },
      {
        method: 'GET',
        path: '/slash',
        handler: function (request, reply) {
          reply('Called the /slash or /slash/ route')
        }
      },
      {
        method: 'GET',
        path: '/slash/{name}',
        handler: function (request, reply) {
          reply('Called route with slash at the end: ' + request.params.name)
        }
      }
     ])

    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes