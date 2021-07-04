exports.a = false

const b = require('./b.js')

exports.a = true
console.log('a 模块, 输出了 b 模块的内容是: ', b)
console.log('a 模块到这儿就执行完了')