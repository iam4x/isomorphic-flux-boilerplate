'use strict';

import chai from 'chai';
import React from 'react';

import altResolver from 'utils/alt-resolver';

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

  afterEach(() => {
    altResolver.cleanPromises();
  });

  it('should map promises on env server', () => {
    altResolver.mapPromises().should.be.empty;
    altResolver.resolve(function () {}, true);
    altResolver.mapPromises().should.not.be.empty;
  });

  it('should clean promises', () => {
    altResolver.mapPromises().should.be.empty;
    altResolver.resolve(function () {}, true);
    altResolver.mapPromises().should.not.be.empty;
    altResolver.cleanPromises();
    altResolver.mapPromises().should.be.empty;
  });

  it('should render async a dummy component', (done) => {
    (async function () {
      const content = await altResolver.render(Dummy, true);
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
      const content = await altResolver.render(DummyError, true);
      should.exist(content);
      content.should.have.string('500');
      return done();
    })();
  });

});
