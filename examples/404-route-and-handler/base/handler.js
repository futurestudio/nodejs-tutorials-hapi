'use strict'

const Handler = {
  index: {
    handler: function (request, reply) {
      reply.view('index')
    }
  },

  missing: {
    handler: function (request, reply) {
      reply.view('404').code(404)
    }
  }
}

module.exports = Handler
