'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'authentication', 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: connect to GitLab')

  next()
}

exports.register.attributes = {
  name: 'connect-to-gitlab',
  version: '1.0.0'
}
