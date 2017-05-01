'use strict'

const Handler = {
  index: {
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.view('authenticated', request.auth.credentials)
      }

      reply.view('index')
    }
  }
}

module.exports = Handler
