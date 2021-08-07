/**
 * exit
 */
process.on('exit', function(code) {
  setTimeout(() => {
    console.log('位置1')
  }, 0);
  console.log('位置2=' + code)
})

console.log('程序执行结束')

/**
 * this
 * 当前模块打印this，输出的不是全局对象global，而是module.exports
 */
console.log(this) // {}

module.exports.foo = 5
module.exports.xx = function() {}

console.log(this) // { foo: 5, xx: function }