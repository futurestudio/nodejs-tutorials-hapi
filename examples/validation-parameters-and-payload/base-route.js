'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    const routes = [
      {
        method: 'POST',
        path: '/{param}',
        config: {
          handler: function (request, reply) {
            reply('You’ve passed all the validations :)')
          },
          validate: {
            params: {
              page: Joi.string().required()
            },
            query: {
              test: Joi.number().optional()
            },
            payload: {
              username: Joi.string().optional()
            },
            headers: {
              'user-agent': Joi.string().optional()
            }
          }
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)

    next()
  }
}

plugin.register.attributes = {
  name: 'validate-all-parameters-payload-headers',
  version: '1.0.0'
}

module.exports = plugin