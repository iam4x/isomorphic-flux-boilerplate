import { defer } from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import fauxJax from 'faux-jax';

import createFlux from 'flux/createFlux';

import ApiClient from '../../../../shared/api-client';
import stubApp from '../../../utils/stub-app';

import DealsList from 'components/deals/deals-list';

chai.should();

describe('DealsList', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    function respond(request) {
      request.respond(
        200,
        { 'Content-Type': 'application/json' },
        '[{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}]'
      );
    }

    fauxJax.install();
    fauxJax.on('request', respond);

    flux = createFlux(new ApiClient());
    const Stubbed = stubApp(flux)(DealsList);

    node = window.document.createElement('div');
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    fauxJax.restore();

    if (instance) {
      ReactDOM.unmountComponentAtNode(node);
    }
  });

  it('should render correctly', () => {
    const el = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    el.should.be.exist;
  });

  it('should render deals after first fetch', (done) => {
    function handleChange() {
      defer(() => {
        const childs = TestUtils
          .scryRenderedDOMComponentsWithClass(instance, 'child');
        childs.length.should.eql(1);
        flux.getStore('dealContainers').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('dealContainers').listen(handleChange);
  });
});
