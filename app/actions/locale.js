'use strict';

import alt from 'utils/alt';
import intlLoader from 'utils/intl-loader';

class LocaleActions {
  constructor() {
    this.generateActions('switchLocaleSuccess');
  }

  async switchLocale(locale) {
    if (locale) {
      const {messages} = await intlLoader(locale);
      return this.actions.switchLocaleSuccess({locale, messages});
    }
  }
}

export default alt.createActions(LocaleActions);
