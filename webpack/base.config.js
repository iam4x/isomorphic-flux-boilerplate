import path from 'path';

import writeStats from './utils/write-stats';

const JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

export default {
  devtool: 'source-map',
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },
  module: {
    preLoaders: [
      { test: JS_REGEX, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
      { test: JS_REGEX, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  plugins: [
    // write webpack stats
    function () { this.plugin('done', writeStats); }
  ],
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx', '.es6', '.babel' ],
    modulesDirectories: [ 'node_modules', 'app' ]
  },
  postcss: (webpack) => [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-url')(),
    require('precss')(),
    require('autoprefixer')({ browsers: [ 'last 2 versions' ] })
  ]
};
