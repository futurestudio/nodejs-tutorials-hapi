'use strict'

const Joi = require('joi')

const plugin = {
  register: function (server, options, next) {
    const routes = [
      {
        method: 'GET',
        path: '/',
        config: {
          handler: function (request, reply) {
            reply('Send a file in POST with name "file" to /upload')
          }
        }
      },
      {
        method: 'POST',
        path: '/upload',
        config: {
          handler: function (request, reply) {
            const payload = request.payload

            console.log(payload.file)

            reply(request.headers)
          },
          payload: {
            maxBytes: 209715200,
            output: 'file',
            parse: true
          }
        }
      },
      {
        method: 'POST',
        path: '/upload-stream',
        config: {
          handler: function (request, reply) {
            const payload = request.payload

            console.log(payload.file)

            reply(request.headers)
          },
          payload: {
            output: 'stream',
            parse: true
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
  name: 'upload-files',
  version: '1.0.0'
}

module.exports = plugin