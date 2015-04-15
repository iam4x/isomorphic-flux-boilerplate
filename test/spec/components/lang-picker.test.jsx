'use strict';

import chai from 'chai';
import React from 'react/addons';
import injectLang from '../../utils/inject-lang';

import LocaleStore from 'stores/locale';
import LangPicker from 'components/shared/lang-picker';

const should = chai.should();

describe('LangPicker', () => {

  let node;
  let instance;
  const TestUtils = React.addons.TestUtils;

  before(() => injectLang.initialize());
  after(() => injectLang.clean());

  beforeEach(() => {
    const element = React.createElement(LangPicker);

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
      LocaleStore.unlisten(handleChange);
      return done();
    };

    // find the inactive locale
    const locales = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    locales.length.should.eql(2);
    const locale = locales.find((l) => !l.props.className);
    should.exist(locale);
    locale.props.children.should.eql('fr');

    // register handler on store change
    LocaleStore.listen(handleChange);

    // fire click for changing locale
    TestUtils.Simulate.click(locale);
  });

});
