import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import radium from 'radium';
import { cyanLink } from 'styles/shared';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

const RadiumLink = radium(Link);
// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
let reactLogo;
if (process.env.BROWSER) {
  reactLogo = require('images/react-logo.png');
} else {
  reactLogo = imageResolver('images/react-logo.png');
}

@connect(({ requests: { inProgress }, session: { session } }) =>
  ({ inProgress, session }))
@radium
class Header extends Component {

  static propTypes = {
    inProgress: PropTypes.bool,
    session: PropTypes.object
  }

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  handleLocaleChange(locale) {
    const { flux } = this.context;
    flux.getActions('locale').switchLocale({ locale });
  }

  handleLogout() {
    const { flux } = this.context;
    flux.getActions('session').logout();
  }

  render() {
    const { inProgress, session } = this.props;
    const { locales: [ activeLocale ], i18n } = this.context;
    const { root, logo, logoImg, navbar, navbarChild, navbarLink } = this.getStyles();

    return (
      <header style={ root } className='header' >
        {/* Spinner in the top right corner */}
        <Spinner active={ inProgress } />

        {/* LangPicker on the right side */}
        <LangPicker
          activeLocale={ activeLocale }
          onChange={ ::this.handleLocaleChange } />

        {/* React Logo in header */}
        <RadiumLink to='/' style={ logo }>
          <img src={ reactLogo } style={ logoImg } alt='react-logo' />
        </RadiumLink>

        {/* RadiumLinks in the navbar */}
        <ul style={ navbar }>
          <li style={ navbarChild }>
            <RadiumLink to={ i18n('routes.users') } style={ navbarLink }>
              { i18n('header.users') }
            </RadiumLink>
          </li>
          <li style={ navbarChild }>
            <RadiumLink to={ i18n('routes.guides') } style={ navbarLink }>
              { i18n('header.guides') }
            </RadiumLink>
          </li>
          { session ?
            [
              <li key={ 0 } style={ navbarChild }>
                <RadiumLink to={ i18n('routes.account') } style={ navbarLink }>
                  { i18n('header.account') }
                </RadiumLink>
              </li>,
              <li key={ 1 } style={ navbarChild }>
                <a href='#' onClick={ ::this.handleLogout }>
                  { i18n('header.logout') }
                </a>
              </li>
            ] :
            <li style={ navbarChild }>
              <RadiumLink to={ i18n('routes.login') } style={ navbarLink }>
                { i18n('header.login') }
              </RadiumLink>
            </li>
          }
        </ul>
      </header>
    );
  }

  getStyles() {
    return {
      root: {
        position: 'relative'
      },
      logo: {
        display: 'block',
        width: 200,
        height: 200,
        margin: '0 auto'
      },
      logoImg: {
        width: '100%'
      },
      navbar: {
        textAlign: 'center',
        padding: 0
      },
      navbarChild: {
        display: 'inline-block',
        margin: '0 10px'
      },
      navbarLink: [ cyanLink, { padding: '0 .4em' } ]
    };
  }
}

export default Header;
