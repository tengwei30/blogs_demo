
const WebpackDevServer = require("webpack-dev-server")
const webpack = require('webpack')
const DevConfig = require('./webpack.dev.config')
const baseConfig = require('./config.js')

DevConfig.plugins = (DevConfig.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
])
const options = {
  contentBase:  false,
  publicPath: baseConfig.dev.assetsPublicPath,
  hot: true,
  host: baseConfig.dev.host,
  open: true,
  quiet: true,
  compress: true,
  inline: true
}
WebpackDevServer.addDevServerEntrypoints(DevConfig, options)
const compiler = webpack(DevConfig)
const server = new WebpackDevServer(compiler, options)
server.listen(baseConfig.dev.port, baseConfig.dev.host, () => {})