'use strict'

const Hoek = require('hoek')

exports.register = function (server, options, next) {
  // declare dependency to hapi-auth-cookie and bell
  server.register([
    {
      register: require('hapi-auth-cookie')
    },
    {
      register: require('bell')
    }
  ], err => {
    Hoek.assert(!err, 'Cannot register authentication plugin')

    /**
     * Register session based auth strategy to store
     * credentials received from GitHub and keep
     * the user logged in
     */
    server.auth.strategy('session', 'cookie', {
      password: 'ThisIsASecretPasswordForTheAuthCookie',
      redirectTo: '/',
      isSecure: process.env.NODE_ENV === 'production'
    })

    /**
     * Register 'github' authentication strategy
     */
    server.auth.strategy('github', 'bell', {
      provider: 'github',
      password: 'ThisIsASecretCookiePasswordForGitHub',
      clientId: 'aee4fc96cc87416273cd',
      clientSecret: '5a0885bd00510c16931102459aea74063ea7c505',
      isSecure: process.env.NODE_ENV === 'production'
    })

    server.log('info', 'Plugin registered: bell authentication with strategy »github«')

    next()
  })
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0',
  once: true
}
