'use strict';

import chai from 'chai';
import React from 'react/addons';
import objectAssign from 'react/lib/Object.assign';
import Flux from 'utils/flux';

import injectLang from '../../utils/inject-lang';

import LangPicker from 'components/shared/lang-picker';

const should = chai.should();

describe('LangPicker', () => {

  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();

    const props = objectAssign(
      {store: flux.getStore('locale'), actions: flux.getActions('locale')},
      injectLang(flux)
    );
    const element = React.createElement(LangPicker, props);

    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(() => {
    if (instance && instance.isMounted()) {
      React.unmountComponentAtNode(node);
    }
  });

  it('should have en locale active', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.props.children.should.eql('en');
  });

  it('should change locale on click', (done) => {
    const handleChange = () => {
      // find the active locale
      const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
      should.exist(active);
      active.props.children.should.eql('fr');

      // clean
      flux.getStore('locale').unlisten(handleChange);
      return done();
    };

    // find the inactive locale
    const locales = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    locales.length.should.eql(2);
    const locale = locales.find((l) => !l.props.className);
    should.exist(locale);
    locale.props.children.should.eql('fr');

    // register handler on store change
    flux.getStore('locale').listen(handleChange);

    // fire click for changing locale
    TestUtils.Simulate.click(locale);
  });

  it('should do nothing on same locale click', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.props.children.should.eql('en');
    TestUtils.Simulate.click(active);
    active.props.className.should.eql('active');
  });

});
