import { defer } from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Flux from 'utils/flux';

import stubApp from '../../utils/stub-app';

import Users from 'components/users';

const should = chai.should();

describe('Users', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    flux = new Flux();
    const Stubbed = stubApp(flux)(Users);

    node = window.document.createElement('div');
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    if (instance) {
      ReactDOM.unmountComponentAtNode(node);
    }
  });

  it('should render correctly', () => {
    const { messages } = flux.getStore('locale').getState();
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.textContent.should.eql(messages.users.title);
  });

  it('should render without users', () => {
    // Check `<li></li>` don't exists
    const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
    td.length.should.eql(0);
  });

  it('should render 10 users after first fetch', (done) => {
    function handleChange() {
      defer(() => {
        const td = TestUtils
          .scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(10);

        flux.getStore('users').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('users').listen(handleChange);
  });

  it('should add an user after click on add button', (done) => {
    function handleAddChange() {
      defer(() => {
        // 11 users after add
        const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(11);

        // clean
        flux.getStore('users').unlisten(handleAddChange);
        return done();
      });
    }

    function handleFetchChange() {
      defer(() => {
        // 10 users after fetch
        const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(10);

        // clean
        flux.getStore('users').unlisten(handleFetchChange);

        // add an user
        flux.getStore('users').listen(handleAddChange);
        const addButton = TestUtils.findRenderedDOMComponentWithClass(instance, 'add--button');
        should.exist(addButton);

        defer(() => TestUtils.Simulate.click(addButton));
      });
    }

    flux.getStore('users').listen(handleFetchChange);
  });

  it('should remove an user', (done) => {
    function handleChange() {
      defer(() => {
        // 10 users after fetch
        let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(10);

        // remove an user
        const removeButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--remove')[0];
        should.exist(removeButton);

        // wait for dispatch to be done before
        // calling another action
        defer(() => {
          TestUtils.Simulate.click(removeButton);

          // it should have 9 users
          td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
          td.length.should.eql(9);

          // clean
          flux.getStore('users').unlisten(handleChange);
          return done();
        });
      });
    }

    flux.getStore('users').listen(handleChange);
  });
});
