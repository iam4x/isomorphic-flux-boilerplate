import React, { Component, PropTypes } from 'react';
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

const styles = {
  base: {
    fontSize: 16,
    backgroundColor: '#0074d9',
    color: '#fff',
    border: 0,
    borderRadius: '0.3em',
    padding: '0.4em 1em',
    cursor: 'pointer',
    outline: 'none',

    '@media (min-width: 992px)': {
      padding: '0.6em 1.2em'
    },

    '@media (min-width: 1200px)': {
      padding: '0.8em 1.5em'
    },

    ':hover': {
      backgroundColor: '#0088FF'
    },

    ':focus': {
      backgroundColor: '#0088FF'
    },

    ':active': {
      backgroundColor: '#005299',
      transform: 'translateY(2px)'
    }
  },
  logo: {
    height: '200px'
  }
};

@Radium
class Header extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  state = { spinner: false }

  componentDidMount() {
    const { flux } = this.context;
    flux.getStore('requests').listen(::this.handleRequest);
  }

  handleRequest({ inProgress }) {
    this.setState({ spinner: inProgress });
  }

  render() {
    const { locales, flux } = this.context;
    const [ activeLocale ] = locales;

    return (
      <header className='app--header'>

        <button style={ styles.base } >Foo</button>

        {/* Spinner in the top right corner */}
        <Spinner active={ this.state.spinner } />

        {/* LangPicker on the right side */}
        <LangPicker
          activeLocale={ activeLocale }
          onChange={ flux.getActions('locale').switchLocale } />

        {/* React Logo in header */}
        <Link to='/' style={ { display: 'block', textAlign: 'center' } } >
          <img src={ reactLogo } style={ styles.logo } alt='react-logo' />
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
