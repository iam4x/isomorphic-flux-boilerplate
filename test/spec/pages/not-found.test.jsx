import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import createFlux from 'flux/createFlux';
import NotFound from 'pages/not-found';

import stubApp from '../../utils/stub-app';
import ApiClient from '../../../shared/api-client';

chai.should();

describe('NotFoundPage', () => {
  let instance;
  let node;
  let flux;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    const Stubbed = stubApp(flux)(NotFound, { flux });

    node = window.document.createElement('div');
    instance = ReactDOM.render(<Stubbed />, node);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render correctly', () => {
    const title = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
    title.textContent.should.eql('404');
  });
});
