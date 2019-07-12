'use strict'

const Handler = {
  index: {
    handler: function (request, reply) {
      reply.view('index')
    }
  },

  second: {
    handler: function (request, reply) {
      reply.view('index', null, { layout: 'second-layout' })
    }
  }
}

module.exports = Handler
