'use strict'

const _ = require('lodash')
const Hoek = require('hoek')
const Path = require('path')
const Fs = require('fs')
const TemplatePath = Path.join(__dirname, './error.html')
let Template

const Defaults = {
  isProduction: false
}

Fs.readFile(TemplatePath, 'utf8', (err, contents) => {
  if (err) {
    throw err
  }

  Template = contents
});

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  const config = Object.assign(Defaults, options)

  // Hoek.assert(config.template, 'Error template name is required within the plugin registration options, use the "template" key.')

  server.ext('onPreResponse', (request, reply) => {
    if (config.isProduction) {
      return reply.continue()
    }

    const response = request.response
    const accept = request.raw.req.headers.accept

    if (response.isBoom) {
      const statusCode = response.output.payload.statusCode

      const errorResponse = {
        title: response.output.payload.error,
        statusCode: statusCode,
        message: response.message,
        method: request.raw.req.method,
        url: request.url.path,
        // payload: request.payload,
        stacktrace: response.stack
      }

      // Header check, should take priority
      if (accept && accept.match(/json/)) {
        // for REST/JSON requests
        return reply(errorResponse).code(statusCode)
      }

      if (options.template) {
        return reply.view(options.template, errorResponse).code(statusCode)
      }

      const output = Template.replace(/%(\w+)%/g, (full, token) => {
        return errorResponse[token] || ''
      })

      return reply(output).code(statusCode)
    }

    return reply.continue()
  })

  server.log('info', 'Plugin registered: show error stacktrace')

  next()
}

exports.register.attributes = {
  name: 'show-error-stacktrace',
  version: '1.0.0'
}
