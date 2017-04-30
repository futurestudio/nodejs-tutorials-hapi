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
    path: '/connect/gitlab',
    config: Handler.connect
  }
]

module.exports = Routes
