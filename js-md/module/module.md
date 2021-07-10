## 前端模块化
1. 闭包是什么？闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常用方式，就是在一个函数内部创建另一个函数
2. 闭包的东西存在什么位置？  堆， 栈会释放掉
3. 逃逸分析是什么？ 浏览器从底层帮你分析哪些变量是后面需要用的，哪些是不需要用的，不需要的由gc去清理
4. commonjs是同步还是异步的？  同步
5. 同步和异步的区别？ 同步会造成阻塞，异步不必等待结果
6. 异步的本质是什么？ 异步的本质就是使用回调函数来模拟的
7. commonjs怎么解决循环引用？ 只执行已经输出的（exports）部分，其他的未导出的不用管
8. commonjs是值拷贝还是引用拷贝？ common值拷贝,esm引用.
9. 什么是模块？ 模块已经成为了代码管理/编译，业务分离的基本单元。
10. 为什么要用模块化？ 把复杂问题分解成多个子问题;大型软件开发的技术基础;开发方式的革新

### IIFE 立即调用函数表达式(闭包)
主要应用在浏览器端
利用闭包的原理创造一个独有的函数作用域来保存私有变量，达到模块化的效果
```js
(function() {
  statement
})()
```
### CMJ

文件时一个模块，私有。 内置两个变量 module require （exports = module.exports）

一个引入，一个导出就构成了通信的基本结构

- 暴露模块: ` module.exports = value ` 或者  `exports.xx = value`(exports 是一个导出的对象)
- 引入模块: `require(xx)`  如果是第三方模块,xx为模块名,如果是自定义模块,xx为模块的文件路径

### AMD
全称是 Asynchronous Module Definition - 异步模块定义
和 CommonJS 不同的是 AMD 采用非同步的方式来加载模块。

- 定义暴露模块:
```js
// 定义没有依赖的模块
define(function() {
  return 模块
})

// 定义有依赖的模块
define(["module1", "module2"], function(m1, m2) {
  return 模块
})
```
- 引入使用模块:
```js
require(["module1", "module2"], function(m1, m2) {
  // 使用m1和m2
})
```

### CMD
CMD---是 SeaJS 在推广过程中对模块定义的规范化产出，是一个同步模块定义，是 SeaJS 的一个标准，SeaJS 是 CMD 概念的一个实现，SeaJS 是淘宝团队提供的一个模块开发的 JS 框架。

特点： CMD 是 AMD 在基础上改进的一种规范，和 AMD 不同在于依赖模块的执行机制不同，CMD 是就近依赖，而 AMD 是前置依赖。
环境： 浏览器环境
语法： 
- 导入: `define(function(require, exports, module) {})`
- 导出: `define(function() { return value })`

### UMD
全称 Universal Module Definition 看名字就知道，特点是兼容 AMD 和 CommonJS 规范，而且兼容全局引入。

环境： 服务器环境和浏览器端
原理： 
- 先判断是否支持 AMD(define是否存在), 存在则使用 AMD 方式加载模块
- 在判断是否支持 Node.js 模块格式 (exports是否存在)，存在则使用 Node.js 模块格式
- 前两个都不存在，则将模块公开到全局(window 或 global)
使用： 
```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    //AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    //Node, CommonJS之类的
    module.exports = factory(require("jquery"));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  //方法
  function myFuncA() {} // 私有方法，因为没有返回
  function myFuncB() {} // 公共方法，因为返回了

  //暴露公共方法
  return {
    myFuncB,
  };
});
```
比如引入的 jq 的 cnd 其实就 umd的

### ES6 Module
在 ES6 之前，模块化主要是社区在推动进行的，从而出现了 CommonJS 和 AMD 两个，前者用于服务器后者用于浏览器，ES6 模块的出现将完全替代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

特点： 
- 按需加载(编译时加载)
- import 和 export 命令只能在模块的顶层，不能在代码块之中(如：if 语句中)，import() 语句可以在代码块中实现异步动态按需动态加载

环境： 服务器环境和浏览器端
语法：
- 导入：`import { module1, module2 } from '模块路径'`
- 导出：`export` 或 `export default`
- 动态导入： `import('模块路径').then(...)`
和CMJ的区别：
- CMJ 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
- CMJ 模块是运行时加载，ES6 模块是编译时输出接口
- CMJ 模块的 require() 是同步加载模块, ES6 模块的 import 命令是异步加载，又一个独立的模块依赖的解析阶段
缺点：
浏览器和服务器目前的支持不是很好，现阶段仍然需要借助一些工具(Babel)
- 浏览器支持：在新版本的浏览器（如 Chrome）中可以使用<script type="module" src="./foo.js"></script>写法
- 服务器支持（Node）有两种模式，分别是 ES6 模块和 CommonJS。
  - 从 Node.js v13.2 开始，默认支持 ES6 模块，但是需要采用.mjs为后缀名、或者在package.json中修改type字段为module（推荐）
  - 使用 CommonJS 的话需要以.cjs为后缀，也可以设置package.json中修改type字段为commonjs（推荐）
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


### JS模块大纲
JavaScript模块
1. CMD
  - 特点：就近依赖、异步加载、Sea.js 规范
  - 运行环境：浏览器
2. UMD
  - 特点：统一模块使用
  - 运行环境：服务器环境和浏览器端
3. AMD
  - 特点：异步执行、Require.js
  - 运行环境：浏览器
4. ES6 Module
  - 特点：统一语法，按需加载
  - 运行环境：浏览器和服务器
5. IIFE
  - 原理：闭包
  - 运行环境：浏览器
6. CommonJS
  - 特点：同步执行
  - 运行环境：Node.js