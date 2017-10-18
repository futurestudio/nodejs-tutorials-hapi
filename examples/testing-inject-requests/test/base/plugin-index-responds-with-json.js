'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')
const Path = require('path')

const server = new Hapi.Server()
server.connection({ port: 3000 })
server
  .register({
    register: require(Path.resolve(__dirname, '..', '..', 'base'))
  })
  .catch(err => {
    done(err)
  })

const lab = (exports.lab = Lab.script())
const experiment = lab.experiment
const test = lab.test

experiment('hapi-tutorials base plugin', () => {
  test('test if the plugin returns JSON by default', done => {
    const options = {
      url: '/',
      method: 'GET'
    }

    server.inject(options, response => {
      const payload = JSON.parse(response.payload || '{}')

      Code.expect(response.statusCode).to.equal(200)
      Code.expect(payload.name).to.equal('Marcus')
      Code.expect(payload.isDeveloper).to.equal(true)

      done()
    })
  })
})
