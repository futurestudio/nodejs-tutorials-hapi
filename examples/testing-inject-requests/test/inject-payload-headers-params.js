'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')
const Path = require('path')
const Qs = require('querystring')

const server = new Hapi.Server()
server.connection({ port: 3000 })
server
  .register({
    register: require(Path.resolve(__dirname, '..', 'base'))
  })
  .catch(err => {
    throw err
  })

const lab = (exports.lab = Lab.script())
const experiment = lab.experiment
const test = lab.test

experiment('hapi-tutorials base plugin', () => {
  test('test if the plugin returns JSON by default', done => {
    const query = Qs.stringify({ name: 'Marcus' })
    const page = 1

    const options = {
      url: `/inject-data/${page}?${query}`,
      method: 'POST',
      payload: {
        isGeek: false
      },
      headers: {
        'X-Testing-Header': 'Testing-123'
      }
    }

    server.inject(options, response => {
      const payload = JSON.parse(response.payload || '{}')

      Code.expect(response.statusCode).to.equal(200)
      Code.expect(payload.name).to.equal('Marcus')
      Code.expect(payload.isGeek).to.equal(false)
      Code.expect(parseInt(payload.page)).to.equal(page)
      Code.expect(payload['x-testing-header']).to.equal('Testing-123')

      done()
    })
  })
})
