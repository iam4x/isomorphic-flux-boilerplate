'use strict';

import del from 'del';
import path from 'path';
import debug from 'debug';

export default () => {
  const DIST_PATH = path.resolve(__dirname, '../../dist/*');
  del.sync([DIST_PATH]);
  debug('dev')('cleaned `dist` directory');
};
