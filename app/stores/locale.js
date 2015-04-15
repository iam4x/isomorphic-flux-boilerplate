'use strict';

import debug from 'debug';

import alt from 'utils/alt';
import LocaleActions from 'actions/locale';

class LocaleStore {
  constructor() {
    this.bindActions(LocaleActions);
    this.locales = [''];
    this.messages = {};
  }

  static getLocale() {
    return this.getState().locales[0];
  }

  onSwitchLocaleSuccess(data) {

    // Save locale into a cookie
    // that will be read from server on requests
    if (process.env.BROWSER) {
      const Cookies = require('cookies-js');
      Cookies.set('_lang', data.locale, {expires: Infinity});
      debug('dev')(`updated _lang cookie to ${data.locale}`);
    }

    this.locales = [data.locale];
    this.messages = data.messages;
  }
}

export default alt.createStore(LocaleStore, 'LocaleStore');
