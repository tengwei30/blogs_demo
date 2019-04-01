const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.js')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: "js/[name].[chunkhash].js",
    publicPath: '/',
    // 公共模块js单独放一个js文件夹
    chunkFilename: 'js/[name].[id].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 复用的文件，单独抽离 后续再优化此配置
        commons: {
          name: 'commons',
          chunks: 'all', 
          minChunks: 2,
          minSize: 1,
          priority: 0 
        },
        // 提取 node_modules 中代码
        vendor: { 
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all', 
          priority: 10
        }
      }
    },
    /**
     * 提取 webpack 运行时代码
     * optimization.runtimeChunk 直接置为 true 或设置 name
     * webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口
     * 注：这个需要看场景使用，会导致每个入口都加载多一份运行时代码
     */
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          warnings: false,
          comments: false,
          sourceMap: true,
          reduce_vars: true,  // 提取出出现多次但是没有定义成变量去引用的静态值
          compress: {
            // 移除 warning
            warnings: false,
            // 移除 console
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: { removeAll: true },
            safe: true,
            autoprefixer: false
        },
        canPrint: true
      })
    ],
    splitChunks: {
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../dist/'),
    }),
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 压缩抽离样式
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
    }),
  ]
});