'use strict'

const path = require('path')
const Pages = require('./pages')
const utils = require('./utils.js')
const IP = utils.getIPAdress()
const PORT = 9000

module.exports = {
  NORMAL_PAGE_PATH: Pages.NORMAL_PAGE_PATH,
  STATIC_JS_NAME: Pages.STATIC_JS_NAME,
  STATIC_TEMPLATE_NAME: Pages.STATIC_TEMPLATE_NAME,
  OUT_PUT_FOLDER_NAME: Pages.OUT_PUT_FOLDER_NAME,
  dev: {
    // Paths
    assetsSubDirectory: 'growth-statics',
    assetsPublicPath: '/',
    host: IP,
    port: PORT,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    overlay: {
      warnings: false,
      errors: true
    },
    /**
     * https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
     * 开发环境跨域配置, 默认关闭, 配置如下
     * 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
     * pathRewrite重写路径
    */
    // proxyTable: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '^/api' : ''
    //     }
    //   }
    // }
    proxyTable: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, `../${Pages.OUT_PUT_FOLDER_NAME}`),
    assetsSubDirectory: 'growth-statics',
    assetsPublicPath: 'https://m-static.yangcong345.com',
    // assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzipExtensions: ['js', 'css'],
    devtool: '#source-map',
    // bundleAnalyzerReport: process.env.npm_config_report
  }
}
