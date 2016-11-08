'use strict'

const when = require('when')
const errorHandler = require('./error-handler')

const baseRoutes = {
  register: function (server, options, next) {
    // add defined route to hapi server
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        // explicitely force an error that can be logged
        when.promise(function(resolve, reject) {
          reject(new Error('WAT? Hh my goodness, this is an error.'))
        }).catch(function (err) {
          // manually log and send an error to sentry
          errorHandler.reportError(request.server, err)
        })
      }
    })

    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes