'use strict';

import alt from 'utils/alt';
import LocaleActions from 'actions/locale';
import LocaleStore from 'stores/locale';

export default {
  initialize() {
    // initialize LocaleStore with lang=en
    return this.loadLang('en');
  },
  getProps() {
    return LocaleStore.getState();
  },
  loadLang(locale) {
    const {messages} = require(`data/${locale}`);
    LocaleActions.switchLocaleSuccess({locale, messages});
  },
  clean() {
    // reset LocaleStore
    alt.recycle('LocaleStore');
  }
};
