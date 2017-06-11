'use strict'

const Users = require('../users-db')
const Hoek = require('hoek')

exports.register = function (server, options, next) {
  // declare dependency to hapi-auth-cookie and bell
  server.register([
    {
      register: require('hapi-auth-cookie')
    }
  ], err => {
    Hoek.assert(!err, 'Cannot register authentication plugin')

    /**
     * Register session based auth strategy to store
     * credentials received from GitLab and keep
     * the user logged in
     */
    server.auth.strategy('session', 'cookie', {
      password: 'ThisIsASecretPasswordForTheAuthCookie',
      redirectTo: '/login',
      appendNext: true, // appends the current URL to the query param "next". Set to a string to use a different query param name
      isSecure: process.env.NODE_ENV === 'production',
      validateFunc: (request, session, callback) => {
        // validate the existing session
        // this simple example checks the “users db” for an entry
        const username = session.username
        const user = Users[ username ]

        if (!user) {
          return callback(null, false)
        }

        callback(err, true, user)
      }
    })

    next()
  })
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}
