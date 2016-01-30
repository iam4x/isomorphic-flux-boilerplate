import { matchMedia, setClientResolution, getScreen } from 'utils/radium';

global.navigator = { userAgent: 'all' };
const expect = chai.expect;
chai.should();

describe('Radium utils', () => {

  it('should return matchMedia function', () => {
    expect(matchMedia).to.not.be.undefined;
    matchMedia.should.be.func;
  });

  it('should matchMedia work correctly', () => {
    setClientResolution(1900, 1200);
    matchMedia('(max-width: 9999px)').matches.should.be.true;
    matchMedia('(min-width: 100px)').matches.should.be.true;
  });

  it('should getScreen work correctly', () => {
    expect(getScreen).to.not.be.undefined;
    getScreen.should.be.func;
    setClientResolution(1024, 768);
    getScreen().width.should.eql(1024);
    getScreen().height.should.eql(768);
  });
});
