'use strict';

import debug from 'debug';

import RequestsActions from 'actions/requests';

const loaders = {
  en(callback) {
    RequestsActions.start();
    if (!window.Intl) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/en.js',
        'data/en'
      ], (require) => {
        RequestsActions.success();
        require('intl/Intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/en'], (require) => {
        RequestsActions.success();
        const lang = require('data/en');
        return callback(lang);
      });
    }
  },
  fr(callback) {
    RequestsActions.start();
    if (!window.Intl) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/fr.js',
        'data/fr'
      ], (require) => {
        RequestsActions.success();
        require('intl/Intl');
        require('intl/locale-data/jsonp/fr.js');
        const lang = require('data/fr');
        return callback(lang);
      });
    }
    else {
      require.ensure(['data/fr'], (require) => {
        RequestsActions.success();
        const lang = require('data/fr');
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
