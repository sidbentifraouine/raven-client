const webpack = require('webpack');
const { resolve } = require('path');
const { dir, config, rules, plugins } = require('./base');

const webpackConfig = Object.assign({}, config, {
  stats: false,
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'scripts/[name].[chunkhash:8].js',
    path: resolve(__dirname, '..', 'build'),
    publicPath: 'localhost:3333',
  },
  module: {
    rules: [
      ...rules,
    ],
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
    }),
  ],
});

module.exports = webpackConfig;
