'use strict';

import chai from 'chai';
import React from 'react/addons';

import ServerError from 'pages/server-error';

chai.should();

describe('ErrorPage', () => {

  let instance;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<ServerError />);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql('500');
  });

});
