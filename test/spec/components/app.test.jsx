'use strict';

import chai from 'chai';
import React from 'react/addons';
import Flux from 'utils/flux';

import reactRouterStub from '../../utils/stub-router-context';
import injectLang from '../../utils/inject-lang';

import App from 'components/app';

const should = chai.should();

describe('App', () => {

  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  // Inject language
  beforeEach(() => {
    flux = new Flux();
    injectLang(flux);
  });

  beforeEach(() => {
    const Stubbed = reactRouterStub(App, {flux});
    const element = React.createElement(Stubbed);
    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(node);
    }
  });

  it('should render header correctly', () => {
    const header = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'header');
    header.length.should.eql(1);
  });

  it('should render logo correctly', () => {
    const logo = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--logo');
    should.exist(logo);
  });
});
