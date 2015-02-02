module.exports = {
  target: 'web',
  debug: true,
  entry: __dirname + '/app/bundle.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/assets/javascript/'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'}
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules']
  }
};
