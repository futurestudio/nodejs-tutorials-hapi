'use strict'

const Boom = require('boom')
const Bcrypt = require('bcrypt')
const Users = require('./users-db')

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply.view('profile')
        }

        reply.view('index')
      }
    }
  },
  {
    method: 'GET',
    path: '/admin',
    config: {
      auth: {
        strategy: 'session',
        scope: 'admin'
      },
      handler: function (request, reply) {
        reply.view('admin')
      }
    }
  },
  {
    method: 'POST',
    path: '/',
    config: {
      // auth: 'session',
      auth: {
        mode: 'try'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply.view('Profile')
        }

        const username = request.payload.username
        let user = Users[ username ]

        if (!user) {
          return reply(Boom.notFound('No user registered with given credentials'))
        }

        const password = request.payload.password

        return Bcrypt.compare(password, user.password, function (err, isValid) {
          if (isValid) {
            request.server.log('info', 'user authentication successful')
            request.cookieAuth.set(user)
            return reply.view('profile')
          }

          return reply.view('index')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: 'session',
      handler: function (request, reply) {
        request.cookieAuth.clear()
        reply.view('index')
      }
    }
  }
]

module.exports = routes