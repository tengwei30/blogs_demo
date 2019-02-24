
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PUBLIC_PATH = require('./pages')
const isProd = (process.env.NODE_ENV === 'production')
const Config = require('./config.js')
let globMatch = '**'

/**
 * select 多页面选择变量
 */
if (!isProd && global.SELECT_PAGES) {
  globMatch = global.SELECT_PAGES
}
/**
 * 多入口配置
 */
exports.entries = () => {
  console.log(globMatch)
  const entryFiles = glob.sync(`${PUBLIC_PATH.NORMAL_PAGE_PATH}/${globMatch}/app.js`)
  const entry = {}
  entryFiles.forEach(filePath => {
    const fileNameReg = new RegExp(`([^\/]+)\/${PUBLIC_PATH.STATIC_JS_NAME}\.js$`)
    const fileName = filePath.match(fileNameReg)[1]
    entry[fileName] = filePath
  })
  return entry
}

/**
 * 多页面页面配置
 */
exports.htmlPlugin = () => {
  const entryHrml = glob.sync(`${PUBLIC_PATH.NORMAL_PAGE_PATH}/${globMatch}/app.js`)
  const templateHtml = glob.sync(`${PUBLIC_PATH.TEMPLATE_PUBLIC}/index.ejs`)
  const arrHtml = []
  entryHrml.forEach(htmlPath => {
    const htmlReg = new RegExp(`([^\/]+)\/${PUBLIC_PATH.STATIC_JS_NAME}\.js$`)
    const filename = htmlPath.match(htmlReg)[1]
    const assetsPublicPath = isProd ? Config.build.assetsPublicPath : Config.dev.assetsPublicPath
    let config = {
      template: templateHtml[0],
      filename: `${filename}.html`,
      chunks: [ 'vendor', 'manifest' , `${filename}`],
      inject: true,
      hash: true,
      minify: {
        minifyCSS: true,
        minifyJS: true
      },
      staticPath: `${assetsPublicPath}growth-statics`
    }
    if (isProd) {
      config = merge(config, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        isProd: true
      })
    }
    arrHtml.push(new HtmlWebpackPlugin(config))
  })
  return arrHtml
}

