const path = require('path')
const webpack = require('webpack')
// Load the Vue SSR plugin. Don't forget this. :P
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
  // The target should be set to "node" to avoid packaging built-ins.
  target: 'node',
  // The entry should be our server entry file, not the default one.
  entry: './base/main.server.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // We can remove the devServer block.
  performance: {
    hints: false
  },
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  externals: Object.keys(require('./package.json').dependencies),
  devtool: '#source-map',
  // No need to put these behind a production env variable.
  plugins: [
    // Add the SSR plugin here.
    new VueSSRPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
