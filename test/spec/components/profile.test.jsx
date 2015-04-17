'use strict';

import chai from 'chai';
import React from 'react/addons';
import reactRouterStub from '../../utils/stub-router-context';
import {capitalize} from 'lodash';

import Flux from 'utils/flux';
import Profile from 'components/profile';

import {users} from 'data/users.json';

const should = chai.should();
const seed = '7729a1ef4ba6ef68';

describe('Profile', () => {

  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();

    const Stubbed = reactRouterStub(Profile, {flux}, {
      getCurrentParams() {
        return {seed};
      }
    });

    instance = TestUtils.renderIntoDocument(React.createElement(Stubbed));
  });

  afterEach(() => {
    // clean stores
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('should render user name after request', (done) => {
    const handleChange = () => {
      const fullName = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
      should.exist(fullName);
      const user = users.find((u) => u.seed === seed);
      should.exist(user.user);
      fullName.getDOMNode().textContent.should.eql(`${capitalize(user.user.name.first)} ${capitalize(user.user.name.last)}`);
      flux.getStore('users').unlisten(handleChange);
      return done();
    };
    flux.getStore('users').listen(handleChange);
  });

  it('should render user picture after request', (done) => {
    const handleChange = () => {
      const picture = TestUtils.findRenderedDOMComponentWithTag(instance, 'img');
      should.exist(picture);
      const user = users.find((u) => u.seed === seed);
      should.exist(user.user);
      picture.getDOMNode().src.should.eql(user.user.picture.medium);
      flux.getStore('users').unlisten(handleChange);
      return done();
    };
    flux.getStore('users').listen(handleChange);
  });

});
