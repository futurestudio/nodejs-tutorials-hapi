'use strict'

const baseRoutes = {
  register: function (server, options, next) {
    const routes = [
      {
        method: 'GET',
        path: '/directory/{file}',
        handler: {
          directory: {
            path: './files'
          }
        }
      },
      {
        method: 'GET',
        path: '/sub-directory/{file*}',
        handler: {
          directory: {
            path: './files'
          }
        }
      },
      {
        method: 'GET',
        path: '/file/{file*}',
        handler: function (request, reply) {
          const file = request.params.file

          console.log(file)

          reply.file('files/' + file)
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)
    next()
  }
}

baseRoutes.register.attributes = {
  name: 'serve-static-files',
  version: '1.0.0'
}

module.exports = baseRoutes
