'use stric'

const ErrorManager = {
  reportError: function (server, error) {
    server.plugins[ 'hapi-raven' ].client.captureException(error, function (result) {
      server.log('info', 'logged error in sentry with id: ' + result.id)
    })
  }
}

module.exports = ErrorManager
