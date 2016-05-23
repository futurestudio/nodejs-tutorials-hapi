var baseRoutes = {
  register: function (server, options, next) {
    var routes = [
      // optional parameter
      {
        method: 'GET',
        path: '/{identifier?}',
        handler: function (request, reply) {
          reply('Hello Future Studio! You requested data for ' + encodeURIComponent(request.params.identifier))
        }
      },
      // add exemplary POST route
      {
        method: [ 'POST', 'PUT' ],
        path: '/',
        handler: function (request, reply) {
          reply('Hey Bro, awesome to see you around!')
        }
      },
      {
        method: 'GET',
        path: '/page/{page*}',
        handler: function (request, reply) {
          var page = request.params.page || 1
          reply('Greetings from page: ' + encodeURIComponent(page))
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