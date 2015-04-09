'use strict';

import cp from 'child_process';
import path from 'path';
import debug from 'debug';
import browserSync from 'browser-sync';

import assign from 'react/lib/Object.assign';

let server;
let started;
const KOA_PATH = path.join(__dirname, '../../server/index');

const startServer = () => {
  // merge env for the new process
  const env = assign({NODE_ENV: 'development'}, process.env);
  // start the server procress
  server = cp.fork(KOA_PATH, {env});
  // when server is `online`
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (!started) {
        started = true;
        // Start browserSync
        browserSync({
          port: 8080,
          proxy: 'http://localhost:3000'
        });
      }
    }
  });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));

export default function () {
  if (!server) {
    return startServer();
  }
  else {
    debug('dev')('restarting koa application');
    server.kill('SIGTERM');
    return startServer();
  }
};
