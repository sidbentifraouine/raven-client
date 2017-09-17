const webpack = require('webpack');
const { resolve } = require('path');
const { config, rules, plugins } = require('./base');

const webpackConfig = Object.assign({}, config, {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'devel'),
    publicPath: 'http://localhost:3333/',
  },
  module: {
    rules: [
      ...rules,
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    ...plugins,
  ],
  devServer: {
    contentBase: './devel',
    historyApiFallback: true,
    port: 3333,
    inline: true,
    hot: true,
  },
});

module.exports = webpackConfig;
