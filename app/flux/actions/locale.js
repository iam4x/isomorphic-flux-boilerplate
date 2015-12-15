import intlLoader from 'utils/intl-loader';

class LocaleActions {

  switchLocale(payload) {
    // return directly action payload to stores when:
    //   - on app bootstrap (client-side)
    //   - on server routing (server-side)
    if (payload.messages) return payload;

    // async load the data for the locale
    return async (dispatch) => {
      const { messages } = await intlLoader(payload.locale);
      return dispatch({ locale: payload.locale, messages });
    };
  }

}

export default LocaleActions;
