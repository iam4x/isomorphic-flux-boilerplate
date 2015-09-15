require('babel/register');

const debug = require('debug');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./dev.config');

const compiler = webpack(config.webpack);
const devServer = new WebpackDevServer(compiler, config.server.options);

devServer.listen(config.server.port, '0.0.0.0', function() {
  debug('dev')('webpack-dev-server listen on port %s', config.server.port);
});
