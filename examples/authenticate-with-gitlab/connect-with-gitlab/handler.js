'use strict'

const Handler = {
  index: {
    handler: function (request, reply) {
      return reply.view('index')
    }
  },

  /**
   * used to authenticate
   */
  connect: {
    auth: 'gitlab',
    handler: function (request, reply) {
      return reply.view('authenticated', request.auth.credentials)
    }
  }
}

module.exports = Handler
