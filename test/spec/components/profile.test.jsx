import { capitalize, defer } from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import fauxJax from 'faux-jax';

import stubApp from '../../utils/stub-app';

import createFlux from 'flux/createFlux';
import Profile from 'components/profile';

import ApiClient from '../../../shared/api-client';
import { users } from '../../../server/api/data.json';

const should = chai.should();
const seed = '7729a1ef4ba6ef68';

function respond(request) {
  request.respond(
    200,
    { 'Content-Type': 'application/json' },
    '{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}'
  );
  fauxJax.restore();
}

describe('Profile', () => {
  let flux;
  let node;
  let instance;

  beforeEach(() => {
    fauxJax.install();

    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');

    fauxJax.on('request', respond);

    const Stubbed = stubApp(flux)(Profile, { params: { seed } });
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(function () {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render user name after request', (done) => {
    function handleChange() {
      defer(() => {
        const fullName = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        should.exist(fullName);
        const user = users.find((u) => u.seed === seed);
        should.exist(user);
        fullName.textContent.should.eql(`${capitalize(user.user.name.first)} ${capitalize(user.user.name.last)}`);
        flux.getStore('users').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('users').listen(handleChange);
  });

  it('should render user picture after request', (done) => {
    function handleChange() {
      defer(() => {
        const picture = TestUtils.findRenderedDOMComponentWithTag(instance, 'img');
        should.exist(picture);
        const user = users.find((u) => u.seed === seed);
        should.exist(user.user);
        picture.src.should.eql(user.user.picture.medium);
        flux.getStore('users').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('users').listen(handleChange);
  });
});
