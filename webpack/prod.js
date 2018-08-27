const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { dir, config, rules, plugins } = require('./base');

const webpackConfig = Object.assign({}, config, {
  mode: 'production',
  stats: true,
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'scripts/[name].[chunkhash:8].js',
    path: dir.build,
    publicPath: `${process.env.URI_PREFIX}/`,
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        include: dir.source,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              import: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true
            },
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].[contenthash:8].css`,
      allChunks: true,
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
  ],
});

module.exports = webpackConfig;
