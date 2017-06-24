'use strict'

const Bcrypt = require('bcrypt')
const Users = require('../users-db')

const Handler = {
  index: {
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
      reply.view('index')
    }
  },

  showLogin: {
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
        return reply.redirect(request.query.next)
      }

      reply.view('login')
    }
  },

  login: {
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
        return reply.redirect(request.query.next)
      }

      const username = request.payload.username
      const user = Users[ username ]

      if (!user) {
        return reply.view('login', {
          username,
          errormessage: 'No user registered with given credentials'
        }).code(404)
      }

      const password = request.payload.password

      return Bcrypt.compare(password, user.password, function (err, isValid) {
        if (isValid) {
          request.cookieAuth.set(user);
          return reply.redirect(request.query.next)
          //return reply.view('private')
        }

        return reply.view('login', {
          username,
          errormessage: 'No user registered with given credentials'
        }).code(404)
      })
    }
  },

  private: {
    auth: 'session',
    handler: function (request, reply) {
      reply.view('private')
    }
  },

  profile: {
    auth: 'session',
    handler: function (request, reply) {
      reply.view('profile')
    }
  },

  logout: {
    auth: 'session',
    handler: function (request, reply) {
      request.cookieAuth.clear()
      reply.view('index')
    }
  }
}

module.exports = Handler
