import webpack from 'webpack';
import cssnext  from 'cssnext';
import { isArray } from 'lodash';

import baseConfig from './base.config';
import startKoa from './utils/start-koa';

const LOCAL_IP = require('dev-ip')();

const HOST = process.env.C9_HOSTNAME || isArray(LOCAL_IP) && LOCAL_IP[0] || LOCAL_IP || 'localhost';
const PORT = (process.env.C9_HOSTNAME) ? '443' : parseInt(process.env.PORT, 10) + 1 || 3001;
const PUBLIC_PATH = `//${HOST}:${PORT}/assets/`;

const config = Object.assign({}, baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`,
      './app/index.js'
    ]
  },
  ouput: {
    ...baseConfig.output,
    publicPath: PUBLIC_PATH
  },
  postcss: [
    cssnext()
  ]
});

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
    loader: 'file?name=[sha512:hash:base64:7].[ext]',
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    loader: 'style!css?sourceMap!postcss',
    exclude: /node_modules/
  }
]);

config.plugins = [
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

  new webpack.optimize.DedupePlugin()
].concat(config.plugins).concat([
  function() {
    this.plugin('done', startKoa);
  }
]);

export default {
  server: {
    port: PORT,
    options: {
      publicPath: (process.env.C9_HOSTNAME) ? '/' : PUBLIC_PATH,
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
  webpack: config
};
