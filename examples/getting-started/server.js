var Hapi = require('hapi')

// Create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// Start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ', server.info.uri)
})
