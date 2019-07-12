'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'POST',
      path: '/',
      config: {
        handler: function (request, reply) {
          reply('You’ve passed all the validations :)')
        },
        validate: {
          payload: {
            username: Joi.string().required(),
            password: Joi.string().min(6).required(),
            email: Joi.string().email().required()
          },
          options: {
            abortEarly: false
          }
        }
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'validation-request-headers',
  version: '1.0.0'
}

module.exports = plugin
