'use strict';

import debug from 'debug';

export default (imagePath, webpackStats, force) => {
  if (process.env.BROWSER && !force) {
    debug('dev')('`image-resolver` should not be used in browser, something went wrong');
    throw new Error('image-resolver called on browser');
  }
  else {
    // Load images compiled from `webpack-stats`
    const images = webpackStats || require('../../server/webpack-stats.json').images;

    // Find the correct image
    const regex = new RegExp(`${imagePath}$`);
    const image = images.find(img => regex.test(img.original));

    if (image) {
      return image.compiled;
    }
    else {
      // Serve a not-found asset maybe?
      return '';
    }
  }
};
