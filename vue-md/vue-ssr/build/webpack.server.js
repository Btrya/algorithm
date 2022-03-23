const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  mode: 'development',
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  target: 'node', // 打包目标给node用
  output: { // 使用module.exports 导出结果
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server'] // 排除掉自动饮用服务端打包的包
    }),
    new VueSSRServerPlugin()
  ]
})