const webpack = require('webpack');
require("babel-polyfill");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './client/startup/TaxCalculatorApp'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJsPlugin()
  )
}

module.exports = config