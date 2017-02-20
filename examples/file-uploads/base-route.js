'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    const routes = [
      {
        method: 'GET',
        path: '/',
        config: {
          handler: function(request, reply) {
            const payload = request.payload

            console.log(payload)

            reply('Received data and file as stream')
          },
          payload: {
            maxBytes: 209715200,
            output:'stream',
            parse: true
          }
        }
      },
      {
        method: 'POST',
        path: '/upload',
        config: {
          handler: function (request, reply) {

            // TODO

            reply(request.headers)
          },
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().min(6).max(200).required()
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
  name: 'file-uploads',
  version: '1.0.0'
}

module.exports = plugin