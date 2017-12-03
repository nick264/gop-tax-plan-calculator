const webpack = require('webpack');

module.exports = {
  entry: './client/startup/TaxCalculatorApp',
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
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
