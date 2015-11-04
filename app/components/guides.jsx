import React, { Component, PropTypes } from 'react';
import { IntlMixin } from 'react-intl';

class Guides extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('title').set(this.i18n('guides.page-title'));
  }

  render() {
    return (
      <div>
        <h1>Guides</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

}

export default Guides;
