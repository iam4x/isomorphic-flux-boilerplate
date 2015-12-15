import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../utils/stub-app';
import ApiClient from '../../../shared/api-client';

import App from 'components/app';

const should = chai.should();

describe('App', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    const Stubbed = stubApp(flux)(App, { flux });
    const element = React.createElement(Stubbed);
    node = window.document.createElement('div');
    instance = ReactDOM.render(element, node);
  });

  afterEach(function () {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render header correctly', () => {
    const header = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'header');
    header.length.should.eql(1);
  });

  it('should render logo correctly', () => {
    const logo = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--logo');
    should.exist(logo);
  });

  it('should change page title', function () {
    flux.getActions('helmet').update({ title: 'foobar', titleBase: '' });
    document.title.should.eql('foobar');
  });

  it('should handle locale change', function (done) {
    function handleChange({ locales }) {
      locales[0].should.eql('fr');
      const { locales: [ locale ] } = flux.getStore('locale').getState();
      locale.should.eql('fr');
      flux.getStore('locale').unlisten(handleChange);
      return done();
    }

    flux.getStore('locale').listen(handleChange);
    flux.getActions('locale').switchLocale({ locale: 'fr' });
  });

  it('should render children component', function () {
    ReactDOM.unmountComponentAtNode(node);
    const Stubbed = stubApp(flux)(App, { flux });
    const Element = <Stubbed><h1 className='foobar'>foobar</h1></Stubbed>;
    node = window.document.createElement('div');
    instance = ReactDOM.render(Element, node);

    const title = TestUtils.findRenderedDOMComponentWithClass(instance, 'foobar');
    should.exist(title);
  });
});
