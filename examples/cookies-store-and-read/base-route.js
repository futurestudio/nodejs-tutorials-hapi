var util = require('util')

var baseRoutes = {
  register: function (server, options, next) {
    server.state('session', {
      ttl: 1000 * 60 * 60 * 24,
      encoding: 'base64json'
    })

    server.state('email', {
      ttl: 1000 * 60 * 60 * 24 * 7
    })

    var routes = [
      {
        method: 'GET',
        path: '/',
        config: {
          handler: function (request, reply) {
            var email = request.state.email
            if (!email) {
              email = 'info@futurestud.io'
            }

            var session = request.state.session
            if (!session) {
              session = {
                username: 'futurestudio',
                firstvisit: false
              }
            }

            cookie.lastVisit = Date.now()

            return reply('Hello Future Studio')
              .state('session', session)
              .state('email', email)
          }
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)
    next()
  }
}

baseRoutes.register.attributes = {
  name: 'response-status',
  version: '1.0.0'
}

module.exports = baseRoutes
