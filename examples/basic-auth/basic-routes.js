var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var data = {
        message: 'Check the route that requires auth at /basic'
      }

      reply.view('index', data)
    }
  },
  {
    method: 'GET',
    path: '/basic',
    config: {
      auth: 'basic',
      handler: function (request, reply) {
        reply.view('success')
      }
    }
  }
]

module.exports = routes