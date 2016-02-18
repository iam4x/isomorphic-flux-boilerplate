import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';

@connect(({ session: { session } }) => ({ session }))
class AccountPage extends Component {

  static propTypes = { session: PropTypes.object.isRequired }

  render() {
    const { session: { username } } = this.props;

    return (
      <div className='container'>
        <h1>Welcome, { username }!</h1>
      </div>
    );
  }

}

export default AccountPage;
