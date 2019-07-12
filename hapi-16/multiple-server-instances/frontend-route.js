var plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Frontend is totally fine')
      }
    })

    next()
  }
}

plugin.register.attributes = {
  name: 'multiple-server-instances-frontend-routes',
  version: '1.0.0'
}

module.exports = plugin
