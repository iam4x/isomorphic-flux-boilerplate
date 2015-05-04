'use strict';

import debug from 'debug';

class LocaleStore {
  constructor() {
    this.bindActions(this.alt.getActions('locale'));
    this.locales = [''];
    this.messages = {};
  }

  static getLocale() {
    return this.getState().locales[0];
  }

  onSwitchLocaleSuccess(data: Object) {
    // Save locale into a cookie
    // that will be read from server on requests
    if (process.env.BROWSER) {
      const Cookies = require('cookies-js');
      Cookies.set('_lang', data.locale, {expires: Infinity});
      debug('dev')(`updated _lang cookie to ${data.locale}`);
    }

    return this.setState({
      messages: data.messages,
      locales: [data.locale]
    });
  }
}

export default LocaleStore;
