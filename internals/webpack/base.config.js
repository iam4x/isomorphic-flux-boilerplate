import path from 'path'
import webpack from 'webpack'

import writeStats from './utils/write-stats'

const JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/

export default {
  devtool: 'source-map',
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: JS_REGEX,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: JS_REGEX,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),

    // write webpack stats
    function onDone() { this.plugin('done', writeStats) }
  ],
  resolve: {
    extensions: [ '.js', '.json', '.jsx', '.es6', '.babel' ],
    modules: [
      'app',
      'node_modules'
    ]
  }
}
