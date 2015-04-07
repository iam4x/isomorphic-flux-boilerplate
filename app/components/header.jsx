'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <header>
        <ul>
          <li><Link to='app'>Users</Link></li>
          <li><Link to='guides'>Guides</Link></li>
        </ul>
      </header>
    )
  }
});
