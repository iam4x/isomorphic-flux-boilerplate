import React from 'react/addons';
import objectAssign from 'react/lib/Object.assign';
import {capitalize} from 'lodash';

import reactRouterStub from '../../utils/stub-router-context';
import injectLang from '../../utils/inject-lang';

import Flux from 'utils/flux';
import Profile from 'components/profile';

import {users} from 'data/users.json';

const should = chai.should();
const seed = '7729a1ef4ba6ef68';

describe('Profile', () => {
  let flux;
  let node;
  let instance;
  const T = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();
    node = window.document.createElement('div');

    const props = objectAssign({params: {seed}}, {flux}, injectLang(flux));
    const Stubbed = reactRouterStub(Profile, props);

    instance = React.render(React.createElement(Stubbed), node);
  });

  afterEach(function() {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should render user name after request', (done) => {
    const handleChange = () => {
      const fullName = T.findRenderedDOMComponentWithTag(instance, 'h2');
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
      const picture = T.findRenderedDOMComponentWithTag(instance, 'img');
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
