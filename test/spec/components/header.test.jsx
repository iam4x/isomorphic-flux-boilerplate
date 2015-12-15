import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createFlux from 'flux/createFlux';

import stubApp from '../../utils/stub-app';
import ApiClient from '../../../shared/api-client';

import Header from 'components/header';

chai.should();

describe('Header', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    node = window.document.createElement('div');

    const Stubbed = stubApp(flux)(Header);
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    if (instance) ReactDOM.unmountComponentAtNode(node);
  });

  it('should render links correctly', () => {
    const links = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--navbar');
    links.children.length.should.eql(3);
  });

  it('should render lang picker correctly', () => {
    const langs = TestUtils.findRenderedDOMComponentWithClass(instance, 'lang--picker');
    langs.children.length.should.eql(2);
  });

  it('should handle requests change', function () {
    flux.getActions('requests').start();
    const spinner = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--spinner');
    spinner.className.indexOf('active').should.not.eql(-1);

    flux.getActions('requests').stop();
    spinner.className.indexOf('active').should.eql(-1);
  });
});
