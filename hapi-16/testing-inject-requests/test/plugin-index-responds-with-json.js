'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection()

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({ name: 'Marcus', isDeveloper: true })
  }
})

const lab = (exports.lab = Lab.script())
const experiment = lab.experiment
const test = lab.test

experiment('getting started with hapi testing', () => {
  test('test if the route returns JSON by default', done => {
    const options = {
      method: 'GET',
      url: '/'
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
