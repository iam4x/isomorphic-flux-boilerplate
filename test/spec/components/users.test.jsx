'use strict';

import chai from 'chai';
import React from 'react/addons';
import injectLang from '../../utils/inject-lang';

import alt from 'utils/alt';
import UsersStore from 'stores/users';
import Users from 'components/users';

chai.should();

describe('Users', () => {

  let node;
  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    injectLang.initialize();
    const element = React.createElement(Users, injectLang.getProps());

    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(() => {
    // clean stores
    alt.flush();
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(node);
    }
  });

  it('should render correctly', () => {
    const {messages} = injectLang.getProps();
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql(messages.users.title);
  });

  it('should render without users', () => {
    // Check `state.users` is empty
    instance.state.users.should.be.empty;
    // Check `<li></li>` don't exists
    const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
    td.should.be.empty;
  });

  it('should render 10 users after first fetch', (done) => {
    const handleChange = () => {
      const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
      td.length.should.eql(10);
      UsersStore.unlisten(handleChange);
      return done();
    };
    UsersStore.listen(handleChange);
  });

  it('should add an user after click on add button', (done) => {
    let count = 0;
    const handleChange = () => {
      // it should end at second store change,
      // after the second request is resolved
      if (++count === 2) {
        const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(11);
        UsersStore.unlisten(handleChange);
        return done();
      }
    };
    UsersStore.listen(handleChange);
    const addButton = instance.refs['add-button'];
    TestUtils.Simulate.click(addButton);
  });
});
