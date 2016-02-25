import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ServerError from 'pages/server-error';

chai.should();

describe('ErrorPage', () => {
  let instance;
  let node;

  beforeEach(() => {
    node = window.document.createElement('div');
    instance = ReactDOM.render(<ServerError />, node);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.textContent.should.eql('500');
  });
});
