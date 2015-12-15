import cp from 'child_process';
import path from 'path';
import debug from 'debug';
import browserSync from 'browser-sync';
import watch from 'node-watch';
import { noop } from 'lodash';

let server;
let started;
let serverReload;
const KOA_PATH = path.join(__dirname, '../../server/index');

const startServer = () => {
  // Define `restartServer`
  const restartServer = () => {
    debug('dev')('restarting koa application');
    serverReload = true;
    server.kill('SIGTERM');
    return startServer();
  };

  // merge env for the new process
  const env = { ...process.env, NODE_ENV: 'development', BABEL_ENV: 'server' };
  // start the server procress
  server = cp.fork(KOA_PATH, { env });
  // when server is `online`
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (serverReload) {
        serverReload = false;
        browserSync.reload();
      }
      if (!started) {
        started = true;

        // Start browserSync
        browserSync({
          port: parseInt(process.env.PORT, 10) + 2 || 3002,
          proxy: `0.0.0.0:${parseInt(process.env.PORT, 10) || 3000}`
        });

        // Listen for `rs` in stdin to restart server
        debug('dev')('type `rs` in console for restarting koa application');
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (data) {
          const parsedData = (data + '').trim().toLowerCase();
          if (parsedData === 'rs') return restartServer();
        });

        // Start watcher on server files
        // and reload browser on change
        watch(
          path.join(__dirname, '../../server'),
          (file) => !file.match('webpack-stats.json') ? restartServer() : noop()
        );
      }
    }
  });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
export default () => !server ? startServer() : noop();
