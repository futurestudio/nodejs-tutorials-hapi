var Joi = require('joi')

var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'GET',
        path: '/tutorials',
        config: {
          handler: function (request, reply) {
            var queryParams = request.query

            server.log('info', queryParams)

            reply(queryParams)
          },
validate: {
  query: {
    filter: Joi.array().items(Joi.string().valid('premium', 'video')).single(),
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
  name: 'validate-query-parameters',
  version: '1.0.0'
}

module.exports = plugin