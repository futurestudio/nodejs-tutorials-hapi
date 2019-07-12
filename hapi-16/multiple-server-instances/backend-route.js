var plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Backend is ok')
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'multiple-server-instances-backend-routes',
  version: '1.0.0'
}

module.exports = plugin
