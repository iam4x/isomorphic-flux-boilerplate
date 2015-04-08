'use strict';

import cp from 'child_process';
import path from 'path';

import assign from 'react/lib/Object.assign';

let server;
const KOA_PATH = path.join(__dirname, '../../server/index');

const startServer = () => {
  const env = assign({NODE_ENV: 'development'}, process.env);
  server = cp.fork(KOA_PATH, {env});
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      // TODO: Reload browsers
      console.log('message: online');
    }
  });
};

export default function () {
  if (!server) {
    return startServer();
  }
  else {
    console.log('Restarting development server.');
    server.kill('SIGTERM');
    return startServer();
  }
};
