/* eslint-disable */

var webpack = require('webpack');
var cssnext = require('cssnext');

var coverage;
var reporters;
if (process.env.CONTINUOUS_INTEGRATION) {
  coverage = {
    type: 'lcov',
    dir: 'coverage/'
  };
  reporters = ['coverage', 'coveralls'];
}
else {
  coverage = {
    type: 'html',
    dir: 'coverage/'
  };
  reporters = ['progress', 'coverage'];
}

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    browserNoActivityTimeout: 30000,
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: ['tests.webpack.js'],
    preprocessors: {'tests.webpack.js': ['webpack', 'sourcemap']},
    reporters: reporters,
    coverageReporter: coverage,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          // TODO: fix sourcemaps
          // see: https://github.com/deepsweet/isparta-loader/issues/1
          {
            test: /\.js$|.jsx$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.js$|.jsx$/,
            loader: 'isparta?{babel: {stage: 0}}',
            exclude: /node_modules|test|utils/
          },
          {
            test: /\.css$/,
            loader: 'style!css!postcss'
          },
          {
            test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
            loader: 'file?name=[sha512:hash:base64:7].[ext]'
          },
          {
            test: /\.json$/, loader: 'json'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('test')
          }
        })
      ],
      postcss: [
        cssnext()
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
