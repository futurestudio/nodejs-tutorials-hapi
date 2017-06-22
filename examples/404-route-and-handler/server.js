'use strict'

const Hapi = require('hapi')

// create new server instance
const server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([
  {
    register: require('vision')
  },
  {
    register: require('./base')
  }
], err => {
  if (err) {
    throw err
  }

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/views',
    layout: 'layout',
    context: {
      title: '404 — Nothing here'
    }
  })

  // start your server
  server.start(err => {

    if (err) {
      throw err
    }

    console.log('Server running at: ' + server.info.uri)
  })
})
