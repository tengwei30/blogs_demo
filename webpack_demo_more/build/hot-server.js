
const WebpackDevServer = require("webpack-dev-server")
const webpack = require('webpack')
const DevConfig = require('./webpack.dev1.config')
const baseConfig = require('./config.js')

DevConfig.plugins = (DevConfig.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
])
console.log(DevConfig.plugins)
return
const compiler = webpack(DevConfig)
const server = new WebpackDevServer(compiler, {
  contentBase:  false,
  publicPath: baseConfig.dev.assetsPublicPath,
  historyApiFallback: true,
  compress: true,
  inline: true,
  hot: true,
  open: true,
  quiet: true
})
server.listen(baseConfig.dev.port, baseConfig.dev.host, () => {
})