import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../utils/stub-app';
import ApiClient from '../../../shared/api-client';

import LangPicker from 'components/shared/lang-picker';

const should = chai.should();

describe('LangPicker', () => {
  let node;
  let instance;
  let flux;
  let spy;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    spy = sinon.spy();

    const Stubbed = stubApp(flux)(LangPicker, { activeLocale: 'en', onChange: spy });
    const element = React.createElement(Stubbed);

    node = window.document.createElement('div');
    instance = ReactDOM.render(element, node);
  });

  afterEach(function () {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should have en locale active', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.innerHTML.should.eql('en');
  });

  it('should call `onChange` handler', function () {
    const locales = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    locales.length.should.eql(2);

    const inactive = locales.find(l => !l.className);
    TestUtils.Simulate.click(inactive);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith('fr');
  });

  it('should do nothing on same locale click', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.innerHTML.should.eql('en');
    TestUtils.Simulate.click(active);
    active.className.should.eql('active');
  });
});
