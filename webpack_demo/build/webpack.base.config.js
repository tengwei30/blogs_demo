
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: path.resolve(__dirname, '../src/views/app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less'],
    // 配置项目别名
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    noParse: [/lodash/, /react\.min\.js$/],
    rules: [
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
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
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