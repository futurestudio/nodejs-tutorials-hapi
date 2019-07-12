var baseRoutes = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          var data = {
            key: 'value',
            another: false,
            number: 10,
            func: function() {
              return this.number * 10
            }
          }

          reply(data)
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)
    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes