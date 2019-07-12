'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: use Vue.js with Handlebars in hapi')

  next()
}

exports.register.attributes = {
  name: 'vue-and-handlebars',
  version: '1.0.0'
}
