// 假设用户要支持自定义的 clean 的命令
// 这的 plugins 的文件夹，一般是不会放在这里的，这里只是起demo作用
// 一般应是由社区提供

module.exports = (options) => (api) => {
  console.log('options:', options)
  api.registerCommands('clean', (...args) => {
    // clean 命令的逻辑
    console.log('exec clean script success!')
  })
}