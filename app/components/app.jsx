'use strict';

import React from 'react';
import {RouteHandler, Link} from 'react-router';

const App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='app'>Home</Link></li>
            <li><Link to='guides'>Guides</Link></li>
          </ul>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
