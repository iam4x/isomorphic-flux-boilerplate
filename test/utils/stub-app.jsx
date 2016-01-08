/* eslint react/display-name: 0 */
import React, { Component, PropTypes } from 'react';
import I18nContainer from 'utils/i18n-container';

export default function stubApp(flux) {
  const { messages } = require('data/en');

  flux
    .getActions('locale')
    .switchLocale({ locale: 'en', messages });

  return function (DecoratedComponent, props) {
    return class Wrapper extends Component {

      static childContextTypes = {
        flux: PropTypes.object.isRequired
      }

      getChildContext() {
        return { flux };
      }

      render() {
        const customProps = { ...this.props, ...props };
        return (
          <I18nContainer>
            <DecoratedComponent { ...customProps } />
          </I18nContainer>
        );
      }

    };
  };
}
