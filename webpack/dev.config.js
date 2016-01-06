import webpack from 'webpack';
import { isArray } from 'lodash';

import baseConfig from './base.config';
import startKoa from './utils/start-koa';

const { VIRTUAL_HOST, C9_HOSTNAME } = process.env;

const LOCAL_IP = require('dev-ip')();

const PORT = (C9_HOSTNAME) ? '443' : parseInt(process.env.PORT, 10) + 1 || 3001;

const HOST = VIRTUAL_HOST ||
  C9_HOSTNAME ||
  (isArray(LOCAL_IP) && LOCAL_IP[0]) ||
  LOCAL_IP ||
  'localhost';

const PUBLIC_PATH = `//${HOST}:${PORT}/assets/`;

export default {
  server: {
    port: PORT,
    options: {
      publicPath: (C9_HOSTNAME) ? '/' : PUBLIC_PATH,
      hot: true,
      stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
    }
  },
  webpack: {
    ...baseConfig,
    devtool: 'cheap-module-source-map',
    entry: {
      app: [
        `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`,
        './app/index.js'
      ]
    },
    output: { ...baseConfig.output, publicPath: PUBLIC_PATH },
    module: {
      ...baseConfig.module,
      loaders: [
        ...baseConfig.module.loaders,
        {
          test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)(\?v=[0-9].[0-9].[0-9])?$/,
          loader: 'file?name=[sha512:hash:base64:7].[ext]',
          exclude: /node_modules\/(?!font-awesome)/
        },
        {
          test: /\.css$/,
          loader: 'style!css?sourceMap!postcss',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      // hot reload
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify('development')
        }
      }),

      new webpack.optimize.DedupePlugin(),

      ...baseConfig.plugins,

      function () { this.plugin('done', startKoa); }
    ]
  }
};
