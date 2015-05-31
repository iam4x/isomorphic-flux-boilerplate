'use strict';

require('babel/register');

var debug = require('debug');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./dev.config');

var compiler = webpack(config.webpack);
var devServer = new WebpackDevServer(compiler, config.server.options);

devServer.listen(config.server.port, '0.0.0.0', function () {
  debug('dev')('webpack-dev-server listen on port %s', config.server.port);
});
