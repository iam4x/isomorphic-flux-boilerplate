import { defer } from 'lodash';

import React from 'react';
import sd from 'skin-deep';
import fauxJax from 'faux-jax';

import createFlux from 'flux/createFlux';

import ApiClient from '../../../../shared/api-client';
import stubApp from '../../../utils/stub-app';

import DealsList from 'components/deals/deals-list';
import deals from ''

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
        [{
          "id": 1,
          "route": "burger_king",
          "title": "Скидка на один из наборов в сети ресторанов Burger King",
          "subway": "Арбатская",
          "discount": 50,
          "cost": 200,
          "pic": "http://skidki.vmet.ro/system/deals/thumb_for_mains/100349/original/2547780.jpg"
        }, {
          "id": 2,
          "route": "yakitoriya",
          "title": "Меню кухни в сети ресторанов Якитория",
          "subway": "Библиотека им. Ленина",
          "discount": 50,
          "cost": 300,
          "pic": "http://skidki.vmet.ro/system/deals/thumb_for_mains/100349/original/2547780.jpg"
        }]
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
          .scryRenderedDOMComponentsWithClass(instance, 'section');
        childs.length.should.eql(0);
        flux.getStore('dealContainers').unlisten(handleChange);
        return done();
      });
    }

    flux.getStore('dealContainers').listen(handleChange);
  });
});
