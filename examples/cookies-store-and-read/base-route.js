var util = require('util')

var baseRoutes = {
  register: function (server, options, next) {
    server.state('session', {
      ttl: 1000 * 60 * 60 * 24,
      encoding: 'base64json'
    })

    var routes = [
      {
        method: 'GET',
        path: '/',
        config: {
          handler: function (request, reply) {
            var cookie = request.state.session

            if (!cookie) {
              cookie = {
                test: 'hello'
              }
            }

            cookie.lastVisit = Date.now()

            return reply('Hello Future Studio. Your last visit was: ' + cookie.lastVisit).state('session', cookie)
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
