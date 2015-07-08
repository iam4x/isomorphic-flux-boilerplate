import intlLoader from 'utils/intl-loader';

const should = chai.should();

describe('IntlLoader', () => {
  it('should load english lang without polyfill', (done) => {
    (async function () {
      const lang = await intlLoader('en');
      should.exist(lang);
      lang.should.be.an('object');
      lang.should.have.any.keys('messages');
      return done();
    })();
  });

  it('should load french lang without polyfill', (done) => {
    (async function () {
      const lang = await intlLoader('fr');
      should.exist(lang);
      lang.should.be.an('object');
      lang.should.have.any.keys('messages');
      return done();
    })();
  });

  it('should load english and with polyfill', (done) => {
    (async function () {
      const lang = await intlLoader('en', true);
      should.exist(lang);
      lang.should.be.an('object');
      lang.should.have.any.keys('messages');
      return done();
    })();
  });

  it('should load french and with polyfill', (done) => {
    (async function () {
      const lang = await intlLoader('fr', true);
      should.exist(lang);
      lang.should.be.an('object');
      lang.should.have.any.keys('messages');
      return done();
    })();
  });
});
