var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/{param?}',
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
  name: 'optional-path-params',
  version: '1.0.0'
}

module.exports = plugin