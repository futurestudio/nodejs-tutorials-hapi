var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/{path?}',
        handler: function (request, reply) {
          var params = request.params

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
  name: 'path-params-optional-wildcard',
  version: '1.0.0'
}

module.exports = plugin