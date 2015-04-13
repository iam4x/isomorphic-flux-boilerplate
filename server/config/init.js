'use strict';

import debug from 'debug';
import objectAssign from 'react/lib/Object.assign';

import baseConfig from './all.json';
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}.json`);
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default objectAssign(baseConfig, config);
