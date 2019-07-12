'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    config: Handler.index
  },

  {
    method: 'POST',
    path: '/inject-data/{page}',
    config: Handler.injectData
  }
]

module.exports = Routes
