'use strict';

import chai from 'chai';
import React from 'react/addons';
import Flux from 'utils/flux';
import objectAssign from 'react/lib/Object.assign';

import injectLang from '../../utils/inject-lang';

import Users from 'components/users';

const should = chai.should();

describe('Users', () => {

  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();

    const props = objectAssign({flux}, injectLang(flux));
    const element = React.createElement(Users, props);

    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(node);
    }
  });

  it('should render correctly', () => {
    const {messages} = flux.getStore('locale').getState();
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
      flux.getStore('users').unlisten(handleChange);
      return done();
    };
    flux.getStore('users').listen(handleChange);
  });

  it('should add an user after click on add button', (done) => {
    const handleFetchChange = () => {
      // 10 users after fetch
      let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
      td.length.should.eql(10);

      // clean
      flux.getStore('users').unlisten(handleFetchChange);

      // add an user
      flux.getStore('users').listen(handleAddChange);
      const addButton = instance.refs['add-button'];
      should.exist(addButton);

      setTimeout(() => {
        TestUtils.Simulate.click(addButton);
      }, 0);
    };

    const handleAddChange = () => {
      // 11 users after add
      let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
      td.length.should.eql(11);

      // clean
      flux.getStore('users').unlisten(handleAddChange);
      return done();
    };

    flux.getStore('users').listen(handleFetchChange);
  });

  it('should remove an user', (done) => {
    const handleChange = () => {
      // 10 users after fetch
      let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
      td.length.should.eql(10);

      // remove an user
      const removeButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--remove')[0];
      should.exist(removeButton);

      // wait for dispatch to be done before
      // calling another action
      setTimeout(() => {
        TestUtils.Simulate.click(removeButton);

        // it should have 9 users
        td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(9);

        // clean
        flux.getStore('users').unlisten(handleChange);
        return done();
      }, 0);
    };
    flux.getStore('users').listen(handleChange);
  });

});
