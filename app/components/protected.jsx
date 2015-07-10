import React, {Component} from 'react';
import {IntlMixin} from 'react-intl';

import PageTitleActions from 'flux/actions/page-title';
import requireAuth from 'components/shared/require-auth';

const Protected = requireAuth(class Protected extends Component {

  _getIntlMessage = IntlMixin.getIntlMessage

  componentWillMount() {
    PageTitleActions
      .set(this._getIntlMessage('protected.page-title'));
  }

  render() {
    return (
      <div>
        <h1>Protected</h1>
        <p>secret mesaage</p>
      </div>
    );
  }

});

export default Protected;
