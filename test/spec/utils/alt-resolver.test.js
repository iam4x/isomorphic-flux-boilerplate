'use strict';

import chai from 'chai';
import React from 'react';
import Flux from 'utils/flux';
import AltResolver from 'utils/alt-resolver';

import injectLang from '../../utils/inject-lang';

const should = chai.should();

const Dummy = React.createClass({
  render() {
    return React.createElement('h1');
  }
});

const DummyError = React.createClass({
  render() {
    throw new Error();
  }
});

describe('Alt Resolver', () => {

  let flux;
  let altResolver;

  beforeEach(() => {
    flux = new Flux();
    altResolver = new AltResolver();
    injectLang(flux);
  });

  it('should map promises on env server', () => {
    altResolver.mapPromises().should.be.empty;
    altResolver.resolve(function () {}, true);
    altResolver.mapPromises().should.not.be.empty;
  });

  it('should render async a dummy component', (done) => {
    (async function () {
      const content = await altResolver.render(Dummy, flux, true);
      should.exist(content);
      return done();
    })();
  });

  it('should not render on browser', (done) => {
    (async function () {
      const content = await altResolver.render();
      should.not.exist(content);
      return done();
    })();
  });

  it('should render 500 on error', (done) => {
    (async function () {
      const content = await altResolver.render(DummyError, flux, true);
      should.exist(content);
      content.should.have.string('500');
      return done();
    })();
  });

});
