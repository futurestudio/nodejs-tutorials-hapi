var Joi = require('joi')

var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'POST',
        path: '/',
        config: {
          handler: function (request, reply) {
            var payload = request.payload

            server.log('info', payload)

            reply(payload)
          },
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().min(6).max(200).required()
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
  name: 'wildcard-path-params',
  version: '1.0.0'
}

module.exports = plugin