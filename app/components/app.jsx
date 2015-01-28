'use strict';

const React = require('react');
const {RouteHandler, Link} = require('react-router');

const App = React.createClass({
  render() {
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
