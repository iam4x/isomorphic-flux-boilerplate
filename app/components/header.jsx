'use strict';

import React from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

if (process.env.BROWSER) {
  require('styles/header.scss');
}

export default React.createClass({
  displayName: 'Header',
  mixins: [IntlMixin],
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <header className='app--header'>
        <Spinner store={this.props.flux.getStore('requests')} />
        <LangPicker
          store={this.props.flux.getStore('locale')}
          actions={this.props.flux.getActions('locale')} />
        <h1 className='app--logo'>
          React Isomorphic
        </h1>
        <ul className='app--navbar un-select'>
          <li>
            <Link to='app'>
              {this.getIntlMessage('header.users')}
            </Link>
          </li>
          <li>
            <Link to='guides'>
              {this.getIntlMessage('header.guides')}
            </Link>
          </li>
        </ul>
        <hr />
      </header>
    );
  }
});
