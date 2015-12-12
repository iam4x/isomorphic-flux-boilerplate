import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../../utils/stub-app';
import ApiClient from '../../../../shared/api-client';

import DealShow from 'components/deals/deal-show';

const findByType = TestUtils.findRenderedComponentWithType;
chai.should();

describe('DealShow', () => {
  let node;
  let instance;
  let flux;
  let spy;
  let dealShow;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');
    spy = sinon.spy();

    const Stubbed = stubApp(flux)(DealShow, { model: { email: 'foobar@org.com' }, onClose: spy });
    instance = ReactDOM.render(React.createElement(Stubbed), node);
    dealShow = findByType(instance, DealShow);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render correct title text', function() {
    const el = TestUtils.findRenderedDOMComponentWithTag(dealShow, 'span');
    el.textContent.should.eql('foobar@org.com');
  });

  it('should close on title click', function() {
    const el = TestUtils.findRenderedDOMComponentWithTag(dealShow, 'span');
    TestUtils.Simulate.click(el);
    dealShow.state.msgClosed.should.be.true;
    spy.should.have.been.calledOnce;
  });

  it('should buy on button click', function() {
    const btn = TestUtils.findRenderedDOMComponentWithTag(dealShow, 'button');
    TestUtils.Simulate.click(btn);
    dealShow.state.buyClicked.should.be.true;
  });
});
