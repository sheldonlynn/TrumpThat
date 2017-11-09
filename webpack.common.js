/*
    ./webpack.config.js
 */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin('dist');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss$/, loaders: 'style-loader!css-loader!sass-loader'},
      {test: /\.(jpe?g|png|gif|svg|ico)$/i, loader: "url-loader?name=public/images/[name].[ext]"},
    ]
  },
  plugins: [HtmlWebpackPluginConfig, CleanWebpackPluginConfig]
};