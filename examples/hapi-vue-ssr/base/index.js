'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'inert' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: hapi-vue-ssr base')

  next()
}

exports.register.attributes = {
  name: 'hapi-vue-ssr-base',
  version: '1.0.0'
}
