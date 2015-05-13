'use strict';

import React from 'react';
import {IntlMixin} from 'react-intl';

export default React.createClass({
  displayName: 'Guides',
  mixins: [IntlMixin],
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this.getIntlMessage('guides.page-title'));
  },
  render() {
    return (
      <div>
        <h1>Guides</h1>
        <p>Coming soon...</p>
      </div>
    );
  }
});
