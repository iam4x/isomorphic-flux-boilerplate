import imageResolver from 'utils/image-resolver';

const should = chai.should();

describe('ImageResolver', () => {
  // TODO: Set up TDD for server
  // `ImageResolver` is mainly used on the server

  it('should throw an error using on browser', () => {
    try {
      imageResolver();
    } catch (error) {
      should.exist(error);
    }
  });
});
