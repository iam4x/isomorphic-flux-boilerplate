import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import NotFound from 'pages/not-found';

chai.should();

describe('NotFoundPage', () => {
  let instance;
  let node;

  beforeEach(() => {
    node = window.document.createElement('div');
    instance = ReactDOM.render(<NotFound />, node);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.textContent.should.eql('404');
  });
});
