'use strict'

const baseRoutes = {
  register: function (server, options, next) {
    // add defined route to hapi server
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        // log a request message
        request.log(['info', 'error', 'debug'], 'this is my request message')
        // log a server message
        request.server.log('info', 'another for server')

        reply('Did the work :)')
      }
    })

    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes