var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'text'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.js$|.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
          {test: /\.js$|.jsx$/, loader: 'isparta', exclude: /node_modules|test/}
        ],
        noParse: /\.min\.js/
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', 'app']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
