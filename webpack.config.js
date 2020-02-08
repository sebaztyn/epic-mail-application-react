const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  devtool: "cheap-module-source-map",
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
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              "css-hot-loader",
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { modules: true }
              },
              "sass-loader"
            ]
          },
          {
            use: [
              "css-hot-loader",
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "epicmail.css"
    }),
    new HtmlWebpackPlugin({ template: "index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new WebpackMd5Hash(),
    new CopyPlugin([{ from: "./assets/", to: "assets/" }])
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};
