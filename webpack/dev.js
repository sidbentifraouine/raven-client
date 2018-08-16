const webpack = require('webpack');
const { resolve, join } = require('path');
const { config, rules, plugins } = require('./base');

const webpackConfig = Object.assign({}, config, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'devel'),
    publicPath: 'http://localhost:3333/',
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        include: [
          join(__dirname, '../src'),
        ],
        use: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
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
