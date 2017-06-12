'use strict'

const _ = require('lodash')
const Hoek = require('hoek')

const Defaults = {
  showStacktraceInProduction: false
}

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  const config = Object.assign(Defaults, options)

  Hoek.assert(config.template, 'Error template name is required within the plugin registration options, use the "template" key.')

  server.ext('onPreResponse', (request, reply) => {
    const response = request.response
    const accept = request.raw.req.headers.accept

    if (response.isBoom) {
      const statusCode = response.output.payload.statusCode
      let errorResponse = {
        title: response.output.payload.error,
        statusCode: statusCode,
        message: response.message,
      }

      if (!config.isProduction) {
        errorResponse.stacktrace = response.stack
      }

      // Header check, should take priority
      if (accept && accept.match(/json/)) { // support REST/JSON requests
        return reply(errorResponse).code(statusCode)
      }

      return reply.view(options.template, errorResponse).code(statusCode)
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
