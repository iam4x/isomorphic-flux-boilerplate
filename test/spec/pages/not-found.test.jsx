'use strict';

import chai from 'chai';
import React from 'react/addons';

import NotFound from 'pages/not-found';

chai.should();

describe('NotFoundPage', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<NotFound />);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql('404');
  });

});
