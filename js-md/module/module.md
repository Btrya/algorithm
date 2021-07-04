## 前端模块化
1. 闭包是什么？
2. 闭包的东西存在什么位置？  堆， 栈会释放掉
3. 逃逸分析是什么？ 浏览器从底层帮你分析哪些变量是后面需要用的，哪些是不需要用的，不需要的由gc去清理
4. commonjs是同步还是异步的？  同步
5. 同步和异步的区别？ 同步会造成阻塞，异步不必等待结果
6. 异步的本质是什么？ 异步的本质就是使用回调函数来模拟的
7. commonjs怎么解决循环引用？ 只执行已经输出的（exports）部分，其他的未导出的不用管
8. commonjs是值拷贝还是引用拷贝？ common值拷贝,esm引用.
9. 

### CMJ

文件时一个模块，私有。 内置两个变量 module require （exports = module.exports）

一个引入，一个导出就构成了通信的基本结构

#### commonjs是值拷贝
```js
// a.js
var name = 'morrain'
var age = 18
exports.name = name
exports.age = age
exports.setAge = function(a) {
  age = a
}
// b.js
var a = require('a.js')
console.log(a.age) // 18
a.setAge(19)
console.log(a.age) // 18
```