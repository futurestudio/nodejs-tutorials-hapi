var baseRoutes = {
  register: function (server, options, next) {
    var routes = [
      // add “hello world” GET route
      {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply('Hello Future Studio')
        }
      },
      // add exemplary POST route
      {
        method: [ 'POST', 'PUT' ],
        path: '/',
        handler: function (request, reply) {
          reply('Hello Future Studio');
        }
      },
      {
        method: 'GET',
        path: '/page/{page}',
        handler: function (request, reply) {
          reply('Greetings from page ' + encodeURIComponent(request.params.page));
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