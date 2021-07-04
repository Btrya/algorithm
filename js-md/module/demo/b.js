exports.b = false

const a = require('./a.js')

exports.b = true

console.log('b 模块, 输出了 a 模块的内容是: ', a)
console.log('b 模块到这儿就执行完了')