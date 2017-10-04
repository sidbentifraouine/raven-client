const webpack = require('webpack');
const { resolve, join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { dir, config, rules, plugins } = require('./base');

const webpackConfig = Object.assign({}, config, {
  stats: true,
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'scripts/[name].[chunkhash:8].js',
    path: resolve(__dirname, '..', 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        include: [
          join(__dirname, '../src/components'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    ...plugins,
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      allChunks: true,
    }),
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
