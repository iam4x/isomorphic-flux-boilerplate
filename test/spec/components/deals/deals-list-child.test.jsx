import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import fauxJax from 'faux-jax';

import stubApp from '../../../utils/stub-app';

import createFlux from 'flux/createFlux';
import DealsListChild from 'components/deals/deals-list-child';

import ApiClient from '../../../../shared/api-client';

function respond(request) {
  request.respond(
    200,
    { 'Content-Type': 'application/json' },
    '{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}'
  );
  fauxJax.restore();
}

describe('DealsListChild', () => {
  let flux;
  let node;
  let instance;

  beforeEach(() => {
    fauxJax.install();

    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');

    fauxJax.on('request', respond);

    const Stubbed = stubApp(flux)(DealsListChild, { model: {} });
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(function() {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('shouild render correctly', () => {
    const container = TestUtils.findRenderedDOMComponentWithClass(instance, 'deals-list-child');
    container.should.exist;
  });
});
