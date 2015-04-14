'use strict';

import debug from 'debug';

const loaders = {
  en(callback) {
    if (!window.Intl) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/en.js',
        'data/en.json'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('data/en.json');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/en.json'], (require) => {
        const lang = require('data/en.json');
        return callback(lang);
      });
    }
  },
  fr(callback) {
    if (!window.Intl) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/fr.js',
        'data/fr.json'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/fr.js');
        const lang = require('data/fr.json');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/fr.json'], (require) => {
        const lang = require('data/fr.json');
        return callback(lang);
      });
    }
  }
};

export default (locale) => {
  debug('dev')(`loading lang ${locale}`);
  const promise = new Promise((resolve) => loaders[locale](resolve));
  return promise;
};
