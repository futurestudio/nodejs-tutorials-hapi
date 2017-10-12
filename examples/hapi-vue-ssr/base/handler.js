'use strict'

const Fs = require('fs')
const Vue = require('vue')
const Boom = require('boom')
const Path = require('path')

// initialize Renderer with default template layout
const LayoutPath = Path.resolve(__dirname, '..', 'views', 'layout.html')
const Renderer = require('vue-server-renderer').createRenderer({
  template: Fs.readFileSync(LayoutPath, 'utf-8'),
  data: {
    title: 'Welcome to hapi-vue-ssr'
  }
})

function renderAndReply (template, context, reply) {
  const TemplatePath = Path.resolve(__dirname, '..', 'views', `${template}.html`)
  const app = new Vue({
    data: context,
    template: Fs.readFileSync(TemplatePath, 'utf-8')
  })

  return Renderer.renderToString(app, (err, html) => {
    if (err) {
      console.log(err)
      return reply(Boom.boomify(err, { statusCode: 500 }))
    }

    return reply(html)
  })
}

const Handler = {
  index: {
    handler: (request, reply) => {
      renderAndReply('index', null, reply)
    }
  },

  missing: {
    handler: (request, reply) => {
      renderAndReply('about', { url: request.url.path }, reply)
    }
  }
}

module.exports = Handler
