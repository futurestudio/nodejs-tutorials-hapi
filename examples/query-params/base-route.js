var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          var params = request.query

          server.log('info', params)

          reply(params)
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)

    next()
  }
}

plugin.register.attributes = {
  name: 'query-param-routes',
  version: '1.0.0'
}

module.exports = plugin