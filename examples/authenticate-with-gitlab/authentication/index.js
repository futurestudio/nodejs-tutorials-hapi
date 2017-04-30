'use strict'

exports.register = function (server, options, next) {
  // declare dependency to bell
  server.dependency([ 'bell' ])

  /**
   * Register 'gitlab' authentication strategy
   */
  server.auth.strategy('gitlab', 'bell', {
    provider: 'gitlab',
    password: 'ThisIsASecretCookiePasswordForGitLab',
    clientId: '281d2b423e8715a8d8bd1d2c60ab7b3218feb6346a89913bfe4a868a837cc5d8',
    clientSecret: '47c184bcd3e13096e1500d9f7c16d58b19ba6a4e55939cd1a8e33472e2d268e4',
    isSecure: process.env.NODE_ENV === 'production'
  })

  server.log('info', 'Plugin registered: bell authentication with strategy »gitlab«')

  next()
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}
