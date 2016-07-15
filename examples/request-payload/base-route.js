var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'POST',
        path: '/',
        handler: function (request, reply) {
          var payload = request.payload

          server.log('info', payload)

          reply(payload)
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)

    next()
  }
}

plugin.register.attributes = {
  name: 'wildcard-path-params',
  version: '1.0.0'
}

module.exports = plugin