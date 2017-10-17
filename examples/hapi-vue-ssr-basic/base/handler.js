'use strict'

const Fs = require('fs')
const Vue = require('vue')
const Boom = require('boom')
const Path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

// initialize Renderer with default template layout
const LayoutPath = Path.resolve(__dirname, '..', 'views', 'layout.html')
const bundle = require(Path.resolve(__dirname, '..', 'dist', 'vue-ssr-bundle.json'))

const Renderer = createBundleRenderer(bundle, {
  // I know, readFileSync is bad practice
  // It's just shorter to read here.
  template: Fs.readFileSync(LayoutPath, 'utf-8')
})

function render (template, context, reply) {
  const TemplatePath = Path.resolve(__dirname, '..', 'views', `${template}.html`)
  const app = new Vue({
    data: context,
    template: Fs.readFileSync(TemplatePath, 'utf-8')
  })

  console.log(app)

  return Renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      return reply(Boom.boomify(err, { statusCode: 500 }))
    }

    return reply(html).type('text/html')
  })
}

const Handler = {
  index: {
    handler: (request, reply) => {
      render('index', { title: 'Welcome to hapi-vue-ssr' }, reply)
    }
  },

  assets: {
    handler: {
      directory: { path: Path.resolve(__dirname, '..', 'dist') }
    }
  },

  missing: {
    handler: (request, reply) => {
      render('about', { title: 'About', url: request.url.path }, reply)
    }
  }
}

module.exports = Handler
