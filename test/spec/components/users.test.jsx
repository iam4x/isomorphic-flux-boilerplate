import { defer } from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import fauxJax from 'faux-jax';

import createFlux from 'flux/createFlux';

import ApiClient from '../../../shared/api-client';
import stubApp from '../../utils/stub-app';

import Users from 'components/users';

const should = chai.should();

describe('Users', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    function respond(request) {
      request.respond(
        200,
        { 'Content-Type': 'application/json' },
        '[{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}]'
      );
    }

    fauxJax.install();
    fauxJax.on('request', respond);

    flux = createFlux(new ApiClient());
    const Stubbed = stubApp(flux)(Users);

    node = window.document.createElement('div');
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    fauxJax.restore();

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

  it('should render users after first fetch', (done) => {
    function handleChange() {
      defer(() => {
        const td = TestUtils
          .scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(1);

        flux.getStore('users').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('users').listen(handleChange);
  });

  it('should remove an user', (done) => {
    function handleChange() {
      defer(() => {
        // 10 users after fetch
        let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
        td.length.should.eql(1);

        // remove an user
        const removeButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--remove')[0];
        should.exist(removeButton);

        // wait for dispatch to be done before
        // calling another action
        defer(() => {
          TestUtils.Simulate.click(removeButton);

          // it should have 9 users
          td = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'user--row');
          td.length.should.eql(0);

          // clean
          flux.getStore('users').unlisten(handleChange);
          return done();
        });
      });
    }

    flux.getStore('users').listen(handleChange);
  });
});
