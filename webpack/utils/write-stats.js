'use strict';

// borrowed from https://github.com/gpbl/isomorphic500/blob/master/webpack%2Futils%2Fwrite-stats.js
import fs from 'fs';
import path from 'path';
import debug from 'debug';

const filepath = path.resolve(__dirname, '../../server/webpack-stats.json');

export default function (stats) {
  const publicPath = this.options.output.publicPath;
  const json = stats.toJson();

  // get chunks by name and extensions
  const getChunks = function (name, ext) {
    ext = ext || 'js';
    let chunk = json.assetsByChunkName[name];

    // a chunk could be a string or an array, so make sure it is an array
    if (!(Array.isArray(chunk))) {
      chunk = [chunk];
    }

    return chunk
      .filter(chunk => path.extname(chunk) === `.${ext}`) // filter by extension
      .map(chunk => `${publicPath}${chunk}`); // add public path to it
  };

  const script = getChunks('app', 'js');
  const content = {script};

  fs.writeFileSync(filepath, JSON.stringify(content));
  debug('dev')('`webpack-stats.json` updated');
};
