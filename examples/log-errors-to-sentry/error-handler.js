'use stric'

const client = server.plugins[ 'hapi-raven' ].client

const ErrorManager = {
  reportError: function (server, error) {
    client.captureException(error, function (result) {
      server.log('info', 'logged error in sentry with id: ' + result.id)
    })
  }
}

module.exports = ErrorManager
