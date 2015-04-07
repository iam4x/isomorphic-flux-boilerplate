'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Header from 'components/header';

export default React.createClass({
  render() {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }
});
