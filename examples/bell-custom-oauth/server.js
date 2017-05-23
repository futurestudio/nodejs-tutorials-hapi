'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([
  {
    register: require('hapi-auth-cookie')
  },
  {
    register: require('bell')
  },
  {
    register: require('./authentication')
  },
  {
    register: require('vision')
  },
  {
    register: require('./connect-with-your-server')
  }
], function (err) {
  if (err) {
    throw err
  }

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/views',
    layout: 'layout'
  })

  // start your server
  server.start(function (err) {

    if (err) {
      throw err
    }

    console.log('Server running at: ' + server.info.uri)
  })
})
