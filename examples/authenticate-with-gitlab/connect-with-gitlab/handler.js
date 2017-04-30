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
    auth: 'gitlab',
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        const user = request.auth.credentials.profile
        request.cookieAuth.set({
          name: user.name,
          username: user.username,
          avatar: user.avatar_url
        })

        return reply.view('authenticated', user)
      }

      reply.view('index', {
        error: 'There was an issue with GitLab authentication.'
      })
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
