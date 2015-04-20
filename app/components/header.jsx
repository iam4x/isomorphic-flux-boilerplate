'use strict';

import React from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
let reactLogo;
if (process.env.BROWSER) {
  require('styles/header.scss');
  reactLogo = require('images/react-logo.png');
}
else {
  reactLogo = imageResolver('images/react-logo.png');
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
        <Link to='app' className='app--logo'>
          React Isomorphic
          <img src={reactLogo} alt='react-logo' />
        </Link>
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
