'use strict';

import chai from 'chai';
import React from 'react/addons';
import Flux from 'utils/flux';
import objectAssign from 'react/lib/Object.assign';

import reactRouterStub from '../../utils/stub-router-context';
import injectLang from '../../utils/inject-lang';

import Header from 'components/header';

chai.should();

describe('Header', () => {

  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();

    const props = objectAssign({flux}, injectLang(flux));
    const Stubbed = reactRouterStub(Header, props);

    node = window.document.createElement('div');
    instance = React.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(node);
    }
  });

  it('should render links correctly', () => {
    const links = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--navbar');
    links.props.children.length.should.eql(2);
  });

  it('should render lang picker correctly', () => {
    const langs = TestUtils.findRenderedDOMComponentWithClass(instance, 'lang--picker');
    langs.props.children.length.should.eql(2);
  });

});
