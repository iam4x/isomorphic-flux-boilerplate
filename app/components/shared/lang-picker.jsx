'use strict';

import React from 'react';

import LocaleActions from 'actions/locale';

export default React.createClass({
  displayName: 'LangPicker',
  handleClick(locale) {
    LocaleActions.switchLocale(locale);
  },
  render() {
    return (
      <ul className='lang--picker'>
        <li onClick={this.handleClick.bind(this, 'en')}>
          EN
        </li>
        <li onClick={this.handleClick.bind(this, 'fr')}>
          FR
        </li>
      </ul>
    );
  }
});
