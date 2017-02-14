'use strict'

const plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        const headers = request.headers

        server.log('info', headers)

        reply(headers)
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'request-headers',
  version: '1.0.0'
}

module.exports = plugin