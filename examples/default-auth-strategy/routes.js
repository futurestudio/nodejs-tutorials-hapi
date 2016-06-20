var routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply('Authenticated')
        }

        reply('Not Authenticated')
      }
    }
  },
  {
    method: 'GET',
    path: '/not-authenticated',
    config: {
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply('Authenticated')
        }

        reply('Not Authenticated')
      }
    }
  }
]

module.exports = routes