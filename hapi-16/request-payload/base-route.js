'use strict'

const plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'POST',
      path: '/',
      handler: function (request, reply) {
        const payload = request.payload;

        server.log('info', payload)

        reply(payload)
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'wildcard-path-params',
  version: '1.0.0'
}

module.exports = plugin