import React from 'react/addons';

import ServerError from 'pages/server-error';

chai.should();

describe('ErrorPage', () => {
  let instance;
  let node;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    node = window.document.createElement('div');
    instance = React.render(<ServerError />, node);
  });

  afterEach(() => {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.getDOMNode().textContent.should.eql('500');
  });
});
