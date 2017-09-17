const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dir = {
  source: resolve(__dirname, '..', 'src'),
  modules: resolve(__dirname, '..', 'node_modules'),
};

const config = {
  entry: {
    bundle: './src/index',
    react: ['react', 'react-dom'],
    vendors: ['socket.io'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      dir.modules,
      dir.source,
    ],
  },
};

const rules = [{
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: dir.modules,
  use: 'eslint-loader',
}, {
  test: /\.jsx?$/,
  exclude: dir.modules,
  use: 'babel-loader',
}];

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['react', 'vendors'],
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.ejs',
    title: 'Fugee',
  }),
  new webpack.NamedModulesPlugin(),
];

module.exports = {
  dir,
  config,
  rules,
};
