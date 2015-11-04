import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Radium from 'utils/radium';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
let reactLogo;
if (process.env.BROWSER) {
  reactLogo = require('images/react-logo.png');
} else {
  reactLogo = imageResolver('images/react-logo.png');
}

@Radium
@connect(({ requests: { inProgress } }) => ({ inProgress }))
class Header extends Component {

  static propTypes = { inProgress: PropTypes.bool }

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    flux: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  render() {
    const { inProgress } = this.props;
    const { locales, flux } = this.context;
    const [ activeLocale ] = locales;

    return (
      <header className='app--header'>

        {/* Spinner in the top right corner */}
        <Spinner active={ inProgress } />

        {/* LangPicker on the right side */}
        <LangPicker
          activeLocale={ activeLocale }
          onChange={ flux.getActions('locale').switchLocale } />

        {/* React Logo in header */}
        <Link to='/' style={ { display: 'block', textAlign: 'center' } } >
          <img src={ reactLogo } alt='react-logo' />
        </Link>

        {/* Links in the navbar */}
        <ul className='app--navbar text-center reset-list un-select'>
          <li>
            <Link to={ this.i18n('routes.users') }>
              { this.i18n('header.users') }
            </Link>
          </li>
          <li>
            <Link to={ this.i18n('routes.guides') }>
              { this.i18n('header.guides') }
            </Link>
          </li>
          <li>
            <Link to={ this.i18n('routes.protected') }>
              { this.i18n('header.protected') }
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
