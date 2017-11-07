const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/src/public/index.html'),
  filename: path.join(__dirname, '/dist/public/index.html'),
  inject: 'body',
  // minify: true,
  // cache: true,
})

module.exports = {
  entry: path.join(__dirname, '/src/public/index.js'),
  output: {
    path: path.join( __dirname, '/dist/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}