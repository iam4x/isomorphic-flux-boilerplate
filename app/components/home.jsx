'use strict';

import React from 'react';
import Resolver from 'react-resolver';
import request from 'superagent';

const WEATHER = 'http://api.openweathermap.org/data/2.5/find?q=Paris,fr&units=metric';

export default React.createClass({
  mixins: [Resolver.mixin],
  statics: {
    resolve: {
      weather(done) {
        request.get(WEATHER, (res) => done(null, res.body));
      }
    }
  },
  render() {
    let weather = this.props.weather.list[0].main;
    return (
      <div>
        <h1>Paris weather</h1>
        <ul>
          <li>Actual: {weather.temp}</li>
        </ul>
      </div>
    );
  }
});
