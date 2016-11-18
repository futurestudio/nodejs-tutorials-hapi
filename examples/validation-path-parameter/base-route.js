var Joi = require('joi')

var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/tutorials/page/{page}',
        config: {
          handler: function (request, reply) {
            var pathParams = request.params

            server.log('info', pathParams)

            reply(pathParams)
          },
          validate: {
            params: {
              page: Joi.number().min(1)
            }
          }
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)

    next()
  }
}

plugin.register.attributes = {
  name: 'validate-path-parameters',
  version: '1.0.0'
}

module.exports = plugin