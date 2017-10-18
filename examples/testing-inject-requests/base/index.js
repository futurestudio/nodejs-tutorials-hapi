'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.route(Routes)
  server.log('info', 'Plugin registered: test hapi handles by injecting requests')

  next()
}

exports.register.attributes = {
  name: 'hapi-testing-1',
  version: '1.0.0'
}
