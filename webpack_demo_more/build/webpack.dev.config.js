'use strict'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const pageEntry = require('./pageEntry')
const webpack = require('webpack')
const baseConfig = require('./config.js')
const utils = require('./utils.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`项目地址: http://${baseConfig.dev.host}:${baseConfig.dev.port}`]
      },
      onErrors: utils.createNotifierCallback()
    }),
    ...pageEntry.htmlPlugin()
  ],
  optimization: {
    nodeEnv: 'development',
  }
});