'use strict'

exports.register = function (server, options, next) {
  // declare dependency to hapi-auth-cookie and bell
  server.dependency([ 'hapi-auth-cookie', 'bell' ])

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
   * Register 'digitalocean' authentication strategy
   */
  const doUrl = 'https://cloud.digitalocean.com/v1/oauth'
  const doUserUrl = 'https://api.digitalocean.com/v2/account'

  server.auth.strategy('digitalocean', 'bell', {
    //provider: 'github', // <-- instead of this, we do this ->
    provider: {
      protocol: 'oauth2',
      auth: doUrl + '/authorize',
      token: doUrl + '/token',
      scope: [ 'read write' ],
      profile: function (credentials, params, get, callback) {
        get(doUserUrl, null, (profile) => {
          const account = profile.account

          credentials.profile = {
            email: account.email,
            status: account.status,
            dropletLimit: account.droplet_limit,
            raw: account
          }

          return callback()
        })
      }
    },
    password: 'ThisIsASecretCookiePasswordForDigitalOcean',
    clientId: '499d5ba6f00cdc7f4d2c9213c837b5f219a647e377352187087654d2e5804937',
    clientSecret: '1f05d6ad0cbcc74f064300bb3bb8344b93a4d48808439d7cce6dcc79a54de068',
    isSecure: process.env.NODE_ENV === 'production'
  })

  server.log('info', 'Plugin registered: bell authentication with strategy »digitalocean«')

  next()
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}
