'use strict'

const Handler = {
  index: {
    handler: function (request, reply) {
      reply.view('index')
    }
  }
}

module.exports = Handler
