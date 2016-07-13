var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/js/{file*}',
        handler: function (request, reply) {
          // this route matches everything except the restrictive route definition below
          var params = request.params

          server.log('info', params)

          reply(params)
        }
      },
      {
        method: 'GET',
        path: '/filter/{type*2}',
        handler: function (request, reply) {
          // this route matches only if 2 path segments are provided after "filter"
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
  name: 'wildcard-path-params',
  version: '1.0.0'
}

module.exports = plugin