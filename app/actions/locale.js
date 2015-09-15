import intlLoader from 'utils/intl-loader';

class LocaleActions {
  constructor() {
    this.generateActions('switchLocaleSuccess');
  }

  async switchLocale(locale) {
    if (locale) {
      const { messages } = await intlLoader(locale);
      return this.actions.switchLocaleSuccess({ locale, messages });
    }
  }
}

export default LocaleActions;
