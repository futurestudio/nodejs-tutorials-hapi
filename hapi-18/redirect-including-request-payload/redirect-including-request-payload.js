'use strict'

const Hapi = require('@hapi/hapi')

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
})

async function start() {
  server.route([
    {
      method: 'POST',
      path: '/',
      handler: (_, h) => {
        return h.redirect('/new').code(307)
      }
    },
    {
      method: 'POST',
      path: '/new',
      handler: ({ payload }) => {
        return {
          message: 'Received your request including the payload!',
          payload
        }
      }
    }
  ])

  await server.start()
  console.log('Server running on %s', server.info.uri);
}

start()
