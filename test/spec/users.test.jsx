'use strict';

import chai from 'chai';
import React from 'react/addons';

import Users from 'components/users';

const should = chai.should();

describe('Users', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Users />);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    };
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql('Users Add User');
  });

  it('should render without users', () => {
    // Check `state.users` is empty
    instance.state.users.should.be.empty;
    // Check `<li></li>` don't exists
    const li = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    li.should.be.empty;
  });
});
