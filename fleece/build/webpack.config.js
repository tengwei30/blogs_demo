
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini')
const postcssPxToViewport = require('postcss-px-to-viewport')
const postcssWriteSvg = require('postcss-write-svg')
const postcssCssnext = require('postcss-preset-env')
const postcssViewportUnits = require('postcss-viewport-units')
const cssnano = require('cssnano')
const NODE_ENV = process.env.NODE_ENV


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(css|sass)$/,
        use: [
          NODE_ENV ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
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
                //
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: 1920, // (Number) The width of the viewport.
                  viewportHeight: 1080, // (Number) The height of the viewport.
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
            loader: require.resolve('sass-loader'),
          }
        ]
      },
      // {
      //   // 命中 SCSS 文件
      //   test: /\.scss$/,
      //   // 使用一组 Loader 去处理 SCSS 文件。
      //   // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      //   // 排除 node_modules 目录下的文件
      //   exclude: path.resolve(__dirname, 'node_modules'),
      // },
      {
        // 对非文本文件采用 file-loader 加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader'],
      },
      {
        test:/\.(png|jpg|gif|jpeg|svg)$/,
        use:[
            {
                loader: "url-loader",
                options: {
                    name: "[name].[hash:5].[ext]",
                    limit: 1024, // size <= 1kib
                    outputPath: "img"
                }
            }
        ]
      }
    ]
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    // modules: [path.resolve(__dirname, 'node_modules')],
    // 设置文件
    extensions: ['.js', '.jsx', '.json'],
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main'],
    // 设置别名，减少搜索步骤
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'views': path.resolve(__dirname, '../src/views'),
    }
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      minify: {
        collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
        removeComments: true,
        removeAttributeQuotes: true,
      },
      hash: true
    }),
  ],
};