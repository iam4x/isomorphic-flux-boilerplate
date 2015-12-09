import React from 'react';
import ReactDOM from 'react-dom';
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
});
