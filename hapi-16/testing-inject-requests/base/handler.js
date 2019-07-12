'use strict'

const Handler = {
  index: {
    handler: (request, reply) => {
      reply({ name: 'Marcus', isDeveloper: true })
    }
  },

  injectData: {
    handler: (request, reply) => {
      const data = Object.assign({}, request.params, request.query, request.payload, request.headers)

      // if you’re with Node.js v8.6 or later, the spread operator is for you :)
      // const data = { ...request.params, ...request.query, ...request.payload, ...request.headers }

      reply(data)
    }
  }
}

module.exports = Handler
