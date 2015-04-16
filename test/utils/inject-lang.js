'use strict';

export default (flux, locale='en') => {
  const {messages} = require(`data/${locale}`);

  flux
    .getActions('locale')
    .switchLocaleSuccess({locale, messages});

  return flux.getStore('locale').getState();
};
