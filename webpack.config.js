module.exports = {
  target: 'web',
  entry: __dirname + '/app/index.js',
  output: {
    path: __dirname + '/dist/js/',
    filename: 'app.js',
    publicPath: '/assets/js/'
  },
  module: {
    loaders: [
      {test: /\.js/, loader: 'babel-loader'}
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  }
};
