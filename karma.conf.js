import webpack from 'webpack';
import baseConfig from './webpack/base.config';

let coverage;
let reporters;
if (process.env.CIRCLECI) {
  coverage = {
    type: 'lcov',
    dir: process.env.CIRCLE_ARTIFACTS
  };
  reporters = ['coverage', 'coveralls'];
} else {
  coverage = {
    type: 'html',
    dir: 'coverage/'
  };
  reporters = ['progress', 'coverage'];
}

export default function(config) {
  config.set({
    browsers: ['Firefox'],
    browserNoActivityTimeout: 30000,
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: ['tests.webpack.js'],
    preprocessors: { 'tests.webpack.js': ['webpack'] },
    reporters: reporters,
    coverageReporter: coverage,
    webpack: {
      ...baseConfig,
      devtool: 'inline',
      module: {
        ...baseConfig.module,
        loaders: [
          ...baseConfig.module.loaders,
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
            test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)(\?v=[0-9].[0-9].[0-9])?$/,
            loader: 'file?name=[sha512:hash:base64:7].[ext]',
            exclude: /node_modules\/(?!font-awesome)/
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
      ]
    },
    webpackServer: { noInfo: true }
  });
}
