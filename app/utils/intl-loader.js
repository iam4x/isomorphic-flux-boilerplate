'use strict';

import debug from 'debug';

const loaders = {
  en(callback: Function, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/en.js',
        'data/en'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/en'], (require) => {
        const lang = require('data/en');
        return callback(lang);
      });
    }
  },
  fr(callback: Function, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/fr.js',
        'data/fr'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/fr.js');
        const lang = require('data/fr');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/fr'], (require) => {
        const lang = require('data/fr');
        return callback(lang);
      });
    }
  }
};

export default (locale, force) => {
  debug('dev')(`loading lang ${locale}`);
  const promise: Promise = new Promise((resolve) => loaders[locale](resolve, force));
  return promise;
};
