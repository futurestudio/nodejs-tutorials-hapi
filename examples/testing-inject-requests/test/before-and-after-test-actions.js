'use strict'

const Lab = require('lab')
const Hapi = require('hapi')
const Path = require('path')

let server

const lab = (exports.lab = Lab.script())
const experiment = lab.experiment
const test = lab.test

experiment('hapi-tutorials run actions before and after tests', () => {
  // use lab.before if you need to execute code before the tests are executed
  // this is beneficial for asynchronous operations and initializations
  lab.before(done => {
    // run before test
    done()
  })

  // with lab.beforeEach you can run code that is executed before every single test
  // like with lab.before, this is helpful for async operations
  lab.beforeEach(done => {
    // run before every single test
    server = new Hapi.Server()
    server.connection({ port: 3000 })
    server
      .register({
        register: require(Path.resolve(__dirname, '..', 'base'))
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // please have a look at the comments on lab.before and lab.beforeEach ;-)
  lab.after(done => {
    done()
  })

  // please have a look at the comments on lab.before and lab.beforeEach ;-)
  lab.afterEach(done => {
    // run after every single test
    done()
  })

  test('resolves already', done => {
    done()
  })
})
