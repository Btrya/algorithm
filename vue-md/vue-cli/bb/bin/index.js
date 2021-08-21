#!/usr/bin/env node
// 上面这个是指定解析器

const webpack = require('webpack')
const minimist = require('minimist')
const path = require('path')
const buildInWebpackConfig = require('../webpack.config')
const args = minimist(process.argv.slice(2)) // 拿到所有参数

// 这里为了代码好看，协议期了，正常是要做一下拆分
// class PluginMannage {} <- 内聚到一个模块实现
const __commands = {}
const fname = 'bb.config.js'

const runWebpackBuild = () => {
  webpack(buildInWebpackConfig, (err, status) => {
    if (err || status.hasErrors()) {
      return console.log('Build Failed.')
    }
    console.log('Build Success.', args) // npm run build foo=123 的话 就能拿到 ['foo=123']
  })
}

// 封装 api 这个是作为参数塞到自定义插件函数中的，通过这个 api 往外暴露能力
// 正常还是要写一个 class Api extends BaseApi{}
const api = {
  registerCommands(name, impl) {
    const command = __commands[name]
    if (!command) {
      __commands[name] = impl
    }
  },
  chainWepack() {

  },
  addWebpackPlugin(plugin) {

  }
}

const readLocalOptions = () => new Promise((resolve) => {
  const config = require(path.join(process.cwd(), fname)) || {} // 拿到bb.config.js
  const { plugins: { commands } } = config
  if (commands.length) {
    commands.forEach(command => {
      command(api)
    })
  }

  resolve(__commands)
})

readLocalOptions().then((commands) => {
  const command = args._[0] // 取执行命令 bb clean 就能拿到 clean
  if (commands[command]) {
    commands[command]()
  } else {
    runWebpackBuild()
  }
})