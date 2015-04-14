'use strict';

require('babel/register');

var debug = require('debug')('dev');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./dev.config');

var serverOptions = {
  publicPath: '/',
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
};

var compiler = webpack(config);
var devServer = new WebpackDevServer(compiler, serverOptions);

devServer.listen(config.port, 'localhost', function () {
  debug(`\`webpack-dev-server\` listen on port ${config.port}`);
});
