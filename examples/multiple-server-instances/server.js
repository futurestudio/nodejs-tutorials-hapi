var Hapi = require('hapi')
var _ = require('lodash')
var port = 3000

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
var frontend = server.connection({
  host: 'localhost',
  port: process.env.PORT || port,
  labels: 'frontend'
})

frontend.register({
  register: require('./frontend-route')
})


// add another server connection
var backend = server.connection({
  host: 'localhost',
  port: process.env.PORT + 1 || port + 1,
  labels: 'backend'
})

backend.register({
  register: require('./backend-route')
})


// start your server after plugin registration
server.start(function (err) {
  if (err) {
    throw err
  }

  _.forEach(server.connections, function(connection) {
    console.log('Server started at: ' + connection.info.uri)
  })
})
