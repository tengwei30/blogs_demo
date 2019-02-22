'use strict'
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    contentBase:  false,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    inline: true,
    hot: true,
    open: true,
    quiet: true,
    host: '127.0.0.1',
    port: '8080'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '单页面',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/public/index.html'),
      inject: true,
      hash: true,
      minify: {
        minifyCSS: true,
        minifyJS: true
      },
    })
  ]
});