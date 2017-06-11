'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'authentication', 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: redirect to previous page')

  next()
}

exports.register.attributes = {
  name: 'redirect-to-previous-page',
  version: '1.0.0'
}
