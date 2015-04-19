'use strict';

import intlLoader from 'utils/intl-loader';

class LocaleActions {
  constructor() {
    this.generateActions('switchLocaleSuccess');
  }

  async switchLocale(locale: string) {
    if (locale) {
      const {messages}: Object = await intlLoader(locale);
      return this.actions.switchLocaleSuccess({locale, messages});
    }
  }
}

export default LocaleActions;
