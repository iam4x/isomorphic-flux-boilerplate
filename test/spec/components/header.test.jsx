'use strict';

import chai from 'chai';
import React from 'react/addons';
import reactRouterStub from '../../utils/stub-router-context';

import Header from 'components/header';

chai.should();

describe('Header', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    const Stubbed = reactRouterStub(Header);
    instance = TestUtils.renderIntoDocument(React.createElement(Stubbed));
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('should render links correctly', () => {
    const links = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    links.length.should.eql(2);
  });

});
