'use strict';

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

  onSetLocale(locale) {
    this.locales = [locale];
  }

  onSetMessages(messages) {
    this.messages = messages;
  }

  onSwitchLocaleSuccess(data) {
    this.locales = [data.locale];
    this.messages = data.messages;
  }
}

export default alt.createStore(LocaleStore, 'LocaleStore');
