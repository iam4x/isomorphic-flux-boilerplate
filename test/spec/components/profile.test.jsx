'use strict';

import chai from 'chai';
import React from 'react/addons';
import reactRouterStub from '../../utils/stub-router-context';
import {capitalize} from 'lodash';

import alt from 'utils/alt';
import Profile from 'components/profile';
import UsersStore from 'stores/users';

import {users} from 'data/users.json';

const should = chai.should();
const seed = '7729a1ef4ba6ef68';

describe('Profile', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    const Stubbed = reactRouterStub(Profile, {}, {
      getCurrentParams() {
        return {seed};
      }
    });
    instance = TestUtils.renderIntoDocument(React.createElement(Stubbed));
  });

  afterEach(() => {
    // clean stores
    alt.flush();
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
      UsersStore.unlisten(handleChange);
      return done();
    };
    UsersStore.listen(handleChange);
  });

  it('should render user picture after request', (done) => {
    const handleChange = () => {
      const picture = TestUtils.findRenderedDOMComponentWithTag(instance, 'img');
      should.exist(picture);
      const user = users.find((u) => u.seed === seed);
      should.exist(user.user);
      picture.getDOMNode().src.should.eql(user.user.picture.medium);
      UsersStore.unlisten(handleChange);
      return done();
    };
    UsersStore.listen(handleChange);
  });

});
