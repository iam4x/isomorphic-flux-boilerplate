/* eslint max-len: 0 */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'bird3-purifycss-webpack-plugin';

import baseConfig from './base.config';

export default {
  ...baseConfig,
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file?name=[sha512:hash:base64:7].[ext]',
        exclude: /node_modules\/(?!font-awesome)/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file?name=[sha512:hash:base64:7].[ext]!image?optimizationLevel=7&progressive&interlaced',
        exclude: /node_modules\/(?!font-awesome)/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // extract css
    new ExtractTextPlugin('[name]-[chunkhash].css'),

    // set env
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new PurifyCSSPlugin({
      purifyOptions: { info: true },
      paths: [
        'app/**/*.jsx',
        'app/**/*.js',
        'server/views/**/*.hbs',
        'shared/universal-render.jsx',

        // VENDORS WHICH CREATE HTML WITH ID OR CLASSES
        'node_modules/iso/src/iso.js',
        'node_modules/react-router/lib/*.js',
        'node_modules/react-intl/lib/components/*.js'
      ]
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),

    ...baseConfig.plugins
  ]
};
