const webpack = require('webpack');

const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /^(?!.*\.test\.jsx?$).*\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'index.js',
    library: 'cache-fetch',
    libraryTarget: 'umd',
  },
};
