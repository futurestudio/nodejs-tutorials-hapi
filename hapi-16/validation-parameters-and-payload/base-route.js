'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'POST',
      path: '/{page}',
      config: {
        handler: function (request, reply) {
          reply('You’ve passed all the validations :)')
        },
        validate: {
          params: {
            page: Joi.number().required()
          },
          query: {
            test: Joi.number().optional()
          },
          payload: {
            username: Joi.string().required()
          },
          headers: {
            'user-agent': Joi.string()
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
  name: 'validate-all-parameters-payload-headers',
  version: '1.0.0'
}

module.exports = plugin