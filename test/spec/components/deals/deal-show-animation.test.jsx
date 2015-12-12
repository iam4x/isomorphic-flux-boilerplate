import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../../utils/stub-app';
import ApiClient from '../../../../shared/api-client';

import DealShowAnimation from 'components/deals/deal-show-animation';
import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

const findByType = TestUtils.findRenderedComponentWithType;
chai.should();

describe('DealShowAnimation', () => {
  let node;
  let instance;
  let flux;
  let dealShowAnimation;
  let dealsListChild;
  let dealShow;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');

    const Stubbed = stubApp(flux)(DealShowAnimation, { model: { name: 'foobar@org.com' } });
    instance = ReactDOM.render(React.createElement(Stubbed), node);

    dealShowAnimation = findByType(instance, DealShowAnimation);
    dealsListChild = findByType(instance, DealsListChild);
    dealShow = findByType(instance, DealShow);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render DealsListChild component', () => {
    dealsListChild.should.exist;
  });

  it('should render DealShow component', () => {
    dealShow.should.exist;
  });

  it('should have active state on button click', () => {
    const btn = TestUtils
      .findRenderedDOMComponentWithTag(dealsListChild, 'button');

    TestUtils.Simulate.click(btn);
    dealShowAnimation.state.active.should.be.true;
  });

  it('should close page on click from DealShow', () => {
    const btn = TestUtils
      .findRenderedDOMComponentWithTag(dealShow, 'span');

    TestUtils.Simulate.click(btn);
    dealShowAnimation.state.closed.should.be.true;
  });
});
