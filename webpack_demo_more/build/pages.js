'use strict'
const path = require('path')
/**
 * 项目目录统一管理
 */


 module.exports = {
  /**
   *  打包输出路径
   */
  OUT_PUT_FOLDER_NAME: 'dist',

  /**
   * 本地正常开发路径
   */
  NORMAL_PAGE_PATH: path.resolve(__dirname, '../src/views'),

  /**
   * 多界面模版文件
   */
  STATIC_TEMPLATE_NAMEL: 'index.html',

  /**
   * 页面逻辑名称(即src/views/**各个模块内部名称) 默认app.js
   */
  STATIC_JS_NAME: 'app',

  /**
   * 公共文件路径
   */
  TEMPLATE_PUBLIC: path.resolve(__dirname, '../src/public'),

  /**
   * 开发模版路径
   */
  TEMPLATE_PATH: path.resolve(__dirname, '../src/templates'),

  /**
   * 静态文件路径
   */
  STATICS_PATH: path.resolve(__dirname, '../src/statics'),
 }
 