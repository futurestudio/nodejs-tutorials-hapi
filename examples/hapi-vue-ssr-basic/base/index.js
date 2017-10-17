'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.route(Routes)
  server.log('info', 'Plugin registered: 404 handler')

  next()
}

exports.register.attributes = {
  name: '404-handler',
  version: '1.0.0'
}
