import chai from 'chai';
import React from 'react/addons';

import NotFound from 'pages/not-found';

chai.should();

describe('NotFoundPage', () => {
  let instance;
  let node;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    node = window.document.createElement('div');
    instance = React.render(<NotFound />, node);
  });

  afterEach(() => {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql('404');
  });
});
