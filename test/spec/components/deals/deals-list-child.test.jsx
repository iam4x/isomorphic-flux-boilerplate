import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../../utils/stub-app';
import ApiClient from '../../../../shared/api-client';

import DealsListChild from 'components/deals/deals-list-child';

chai.should();

describe('DealsListChild', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');

    const Stubbed = stubApp(flux)(DealsListChild, { model: { email: 'foobar@org.com' } });
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render correctly', function () {
    const el = TestUtils.findRenderedDOMComponentWithTag(instance, 'section');
    el.should.be.exist;
  });
});
