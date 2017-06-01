'use strict'

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
      if (request.auth.isAuthenticated) {
        return reply.view('authenticated', request.auth.credentials)
      }
      
      reply.view('index')
    }
  },

  /**
   * used to authenticate
   */
  connect: {
    auth: 'github',
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        const user = request.auth.credentials.profile
        const data = {
          name: user.displayName,
          username: user.username,
          avatar: user.raw.avatar_url
        }

        request.cookieAuth.set(data)
        return reply.view('authenticated', data)
      }

      reply.view('index', {
        error: 'There was an issue with the GitHub authentication.'
      }).code(400)
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
