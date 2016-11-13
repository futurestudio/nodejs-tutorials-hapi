'use strict'

const baseRoutes = {
  register: function (server, options, next) {
    // add defined route to hapi server
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        request.log(['info'], 'this is my request message');
        request.server.log(['info'], 'another for server');

        reply('Log data to file')
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