import debug from 'debug';

import baseConfig from './all.json';
const { NODE_ENV = 'development' } = process.env;
let config;

try {
  config = require(`./${NODE_ENV}`);
} catch (error) {
  debug('dev')(`No specific configuration for env ${NODE_ENV}`);
}

export default { ...baseConfig, ...config };
