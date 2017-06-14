'use strict'

const Fs = require('fs')
const Path = require('path')
const TemplatePath = Path.join(__dirname, './error.html')

exports.register = (server, options, next) => {

  // default option values
  const defaults = {
    showErrors: false
  }

  const config = Object.assign(defaults, options)

  // want to render specific template? Better make sure `vision` is available :)
  if (config.template) {
    server.dependency([ 'vision' ])
  }

  // read and keep the default error template
  const errorTemplate = Fs.readFileSync(TemplatePath, 'utf8')

  // extend the request lifecycle at `onPreResponse`
  // to change the default error handling behavior (if enabled)
  server.ext('onPreResponse', (request, reply) => {
    if (!config.showErrors) {
      return reply.continue()
    }

    // response shortcut
    const response = request.response

    // only show "bad implementation" developer errors, status code 500
    if (response.isDeveloperError) {
      const accept = request.raw.req.headers.accept
      const statusCode = response.output.payload.statusCode

      const errorResponse = {
        title: response.output.payload.error,
        statusCode: statusCode,
        message: response.message,
        method: request.raw.req.method,
        url: request.url.path,
        payload: request.raw.req.method !== 'GET' ? request.payload : '',
        stacktrace: response.stack
      }

      // take priority: check header if there's a JSON REST request
      if (accept && accept.match(/json/)) {
        return reply(errorResponse).code(statusCode)
      }

      // did the user explicitly specify an error template
      if (options.template) {
        return reply.view(options.template, errorResponse).code(statusCode)
      }

      // prepare the error template and replace %placeholder% with error specific details
      const output = errorTemplate.replace(/%(\w+)%/g, (full, token) => {
        return errorResponse[ token ] || ''
      })

      return reply(output).code(statusCode)
    }

    // go ahead with the response, no developer error detected
    return reply.continue()
  })

  // server.log('info', 'Plugin registered: show error stacktrace')

  next()
}

exports.register.attributes = {
  name: 'show-error-stacktrace',
  version: '1.0.0'
}
