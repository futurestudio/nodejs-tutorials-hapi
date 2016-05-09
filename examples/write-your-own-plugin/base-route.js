var baseRoutes = {
  register: function (server, options, next) {
    // add “hello world” route
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello Future Studio!')
      }
    })

    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes