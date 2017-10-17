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
    path: '/dist/{path*}',
    config: Handler.assets
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{path*}',
    config: Handler.missing
  }
]

module.exports = Routes
