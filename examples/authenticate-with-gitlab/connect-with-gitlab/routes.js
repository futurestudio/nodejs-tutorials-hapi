'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    config: Handler.index
  },
  {
    method: 'GET',
    path: '/auth/gitlab',
    config: Handler.connect
  },
  {
    method: 'GET',
    path: '/logout',
    config: Handler.logout
  }
]

module.exports = Routes
