'use strict';

import React from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('styles/header.scss');
}

export default React.createClass({
  render() {
    return (
      <header className='app--header'>
        <h1 className='app--logo'>
          React Isomorphic
        </h1>
        <ul className='app--navbar'>
          <li><Link to='app'>Users</Link></li>
          <li><Link to='guides'>Guides</Link></li>
        </ul>
      </header>
    );
  }
});
