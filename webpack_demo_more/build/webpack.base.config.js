
const path = require('path')
const pageEntry = require('./pageEntry')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const postcssAspectRatioMini = require('postcss-aspect-ratio-mini')
const postcssPxToViewport = require('postcss-px-to-viewport')
const postcssWriteSvg = require('postcss-write-svg')
const postcssCssnext = require('postcss-preset-env')
const postcssViewportUnits = require('postcss-viewport-units')
const cssnano = require('cssnano')
const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackEslintRule = () => ({
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: resolve('src'),
  options: {
    formatter: require('eslint-friendly-formatter')
  }
})

module.exports = {
  entry: pageEntry.entries(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less'],
    // 配置项目别名
    alias: {
      '@': resolve('src'),
      'utils': resolve('src/utils'),
      'views': resolve('src/views'),
      'assets': resolve('src/assets'),
      'public': resolve('src/public')
    }
  },
  module: {
    noParse: [/lodash/, /react\.min\.js$/],
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,// 屏蔽不需要处理的文件（文件夹）
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ejs$/,
        include: resolve('src'),
        loader: 'ejs-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                // -----插入适配移动端配置项-----:point_down:
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: 750, // (Number) The width of the viewport.
                  viewportHeight: 1334, // (Number) The height of the viewport.
                  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: 'vw', // (String) Expected units.
                  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: false // (Boolean) Allow px to be converted in media queries.
                }),
                postcssWriteSvg({
                  utf8: false
                }),
                postcssCssnext({}),
                postcssViewportUnits({}),
                cssnano({
                  "cssnano-preset-advanced": {
                    zindex: false,
                    autoprefixer: false,
                    "postcss-zindex": false
                  },
                })
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              modules: true,
              modifyVars: {
                  "@primary-color": "#f9c700"
              }
            }
          }
        ]
      }
    ]
  }
}