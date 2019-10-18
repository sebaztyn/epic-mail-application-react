const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 4000,
    stats: { children: false, maxModules: 0 },
    hotOnly: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    { template: 'index.html' }
  ),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};