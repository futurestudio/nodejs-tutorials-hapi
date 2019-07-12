'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      config: {
        handler: function (request, reply) {
          const headers = request.headers

          server.log('info', headers)

          reply(headers)
        },
        validate: {
          headers: {
            'user-agent': Joi.string().required(),
            username: Joi.string().required()
          },
          options: {
            allowUnknown: true
          }
        }
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'validation-return-all-errors',
  version: '1.0.0'
}

module.exports = plugin
