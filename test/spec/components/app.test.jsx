'use strict';

import chai from 'chai';
import React from 'react/addons';
import reactRouterStub from '../../utils/stub-router-context';

import App from 'components/app';

const should = chai.should();

describe('App', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    const Stubbed = reactRouterStub(App);
    instance = TestUtils.renderIntoDocument(React.createElement(Stubbed));
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('should render header correctly', () => {
    const header = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'header');
    header.length.should.eql(1);
  });

  it('should render logo correctly', () => {
    const logo = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--logo');
    should.exist(logo);
    logo.getDOMNode().textContent.should.eql('React Isomorphic');
  });
});
