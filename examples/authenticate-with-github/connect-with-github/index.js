'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.register([
    {
      register: require('vision')
    },
    {
      register: require('./../authentication')
    }
  ], err => {
    if (err) {
      throw err
    }

    server.route(Routes)
    server.log('info', 'Plugin registered: connect to GitHub')

    next()
  })
}

exports.register.attributes = {
  name: 'connect-to-github',
  version: '1.0.0'
}
