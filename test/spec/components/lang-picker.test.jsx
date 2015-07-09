import React from 'react/addons';
import Flux from 'utils/flux';

import injectLang from '../../utils/inject-lang';

import LangPicker from 'components/shared/lang-picker';

const should = chai.should();

describe('LangPicker', () => {
  let node;
  let instance;
  let flux;
  let spy;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();
    spy = sinon.spy();

    const props = Object.assign(
      {activeLocale: 'en', onChange: spy},
      injectLang(flux)
    );

    const element = React.createElement(LangPicker, props);

    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(function() {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should have en locale active', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.props.children.should.eql('en');
  });

  it('should call `onChange` handler', function() {
    const locales = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    locales.length.should.eql(2);

    const inactive = locales.find(l => !l.props.className);
    TestUtils.Simulate.click(inactive);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith('fr');
  });

  it('should do nothing on same locale click', () => {
    const active = TestUtils.findRenderedDOMComponentWithClass(instance, 'active');
    should.exist(active);
    active.props.children.should.eql('en');
    TestUtils.Simulate.click(active);
    active.props.className.should.eql('active');
  });
});
