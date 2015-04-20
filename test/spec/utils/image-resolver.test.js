'use strict';

import chai from 'chai';
import imageResolver from 'utils/image-resolver';

const should = chai.should();

const webpackStats = {
  images: [
    {
      original: 'logo.png',
      compiled: '2uierwi2.png'
    }
  ]
};

describe('ImageResolver', () => {

  it('should resolve for the correct image', () => {
    const image = webpackStats.images[0];
    const imagePath = imageResolver(image.original, webpackStats, true);
    should.exist(imagePath);
    imagePath.should.be.eql(image.compiled);
  });

  it('should resolve to empty string when no image is matched', () => {
    const imagePath = imageResolver('foo.png', webpackStats, true);
    should.exist(imagePath);
    imagePath.should.be.eql('');
  });

  it('should throw an error using on browser', () => {
    try {
      imageResolver();
    }
    catch (error) {
      should.exist(error);
    }
  });

});
