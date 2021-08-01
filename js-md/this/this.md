### 上下文 + 作用域

#### 作用域链
```js
let a = 'global'
console.log(a)

function course() {
  let b = 'Asaki'
  console.log(b)
  session()
  function session() {
    let c = 'Btrya'
    console.log(c)
    more()
    function more() {
      let d = 'Chirs'
      console.log(d)
    }
  }
}
course()
```

#### this 上下文context
* 我家门前有条河，我家门前的河上有座桥，我家门前的河里有群鸭。
* 我家门前有条河，「这河」上有座桥，「这河」里有群鸭。

this是在执行时动态读取上下文决定的。不是在定义时决定

#### 函数直接调用
```js
function foo() {
  console.log('函数内部的this:', this)
}
foo()
```

#### 隐式绑定 - this指向调用堆栈的上一级
```js
function fn() {
  console.log('隐式绑定', this.a)
}
const obj = {
  a: 1
}
obj.fn = fn
obj.fn()
```

#### 实战
```js
const foo = {
  bar: 10,
  fn: function() {
    console.log(this.bar)
    console.log(this)
  }
}
let fn1 = foo.fn
fn1() // undefined window

// 如何改变指向?


const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
    let fn = o1.fn
    return fn()
  }
}
console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
```
* 1. 在执行函数时，如果函数被上一级所调用，那么上下文即指向上一级
* 2. 否则为全局孤立，指向window

#### 现在我需要将console.log(o2.fn())结果是o2 要怎么实现
```js
// 1 - 人为干涉、改变this - bind/call/apply
// 2 - 不允许改变this
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: o1.fn
}
console.log(o1.fn()) // o1
console.log(o2.fn()) // o2

// this 指向最后调用他的对象，在 fn 执行时，函数挂到o2上即可
```

#### 显式绑定 (bind | apply | call)
```js
function foo() {
  console.log('函数内部的this:', this)
}
foo()

foo.call({a: 1})
foo.apply({a: 1})

const bindFoo = foo.bind({a: 1})
bindFoo()
```

#### call、apply、bind的区别
* 1. 传参不同， call、bind参数都是独立开的， apply是数组
* 2. 直接返回不同，最终执行返回相同。 bind会返回一个函数，需要再调用一次

#### new - this指向的是new之后得到的实例
```js
class Course {
  constructor(name) {
    this.name = name
    console.log('构造函数中的this', this)
  }
  test() {
    console.log('类方法中的this', this)
  }
}
const course = new Course('this')
course.test()
```

#### 异步方法中的this有区别吗
```js
class Course {
  constructor(name) {
    this.name = name
    console.log('构造函数中的this', this)
  }
  test() {
    console.log('类方法中的this', this)
  }
  asyncTest() {
    console.log('类方法外的this', this)
    setTimeout(function() {
      console.log('异步方法中的this', this)
    }, 100)
  }
}
const course = new Course('this')
course.test()
course.asyncTest()
```
* 1. 执行setTimeout时，传入匿名function执行，效果和全局执行就函数效果相同
* 2. 如何解决？把function改为无独立上下文的箭头函数即可

#### bind原理 / 手写bind
* 1. bind在哪里
```js
function sum(a, b, c) {
  console.log(a, b, c, this)
  return a + b + c
}
// 1. sum.bind 在哪里 ？
// 在 Function.prototype 里
Function.prototype.newBind = function() {
  // 2. bind 是什么？ 
  // bind 有三个特性 ： a. 返回一个函数 b.返回原函数执行结 c. 传参不变
  const _this = this
  const args = Array.prototype.slice.call(arguments)
  // args特点： 第一项 - newThis, 第二项 - 最后一项 - 函数传参
  const newThis = args.shift()

  return function() {
    return _this.apply(newThis, args)
  }
}
sum.bind(this, 1, 3, 5)
```
* 2. apply应用 - 多传参数组化
```js
Math.max(2, 4, 5, 6)
const arr = [2, 4, 5, 6]
let max = Math.max.apply(this, arr)
```

#### 优先级 - new > 显式 > 隐式 > 默认
```js
function fn() {
  console.log(this)
}
const obj = {
  fn
}
obj.fn() // obj
// 显式 > 隐式
obj.fn.bind(111)() // 111

function foo(a) {
  this.a = a
}
const obj1 = {}

var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2

// new > 显式
let baz = new bar(3)
console.log(obj1.a) // 2
console.log(baz.a) // 3
```

### 闭包：一个函数和他周围状态的引用捆绑在一起的组合

#### 函数作为返回值的场景
```js
function mail() {
  let content = '信'
  return function() {
    console.log(content)
  }
}
const envelop = mail()
envelop()
```
* 函数外部获取到了函数作用域内的变量值

#### 函数作为参数
```js
function envelop(fn) {
  let content = 1
  fn()
}
function mail() {
  let content = 0
  console.log(content)
}
envelop(mail)
```

#### 函数嵌套
```js
let counter = 0

function outerFn() {
  function innerFn() {
    counter++
    console.log(counter)
  }
  return innerFn
}
```

#### 事件处理（异步执行）的闭包
```js
let lis = document.getElementsByTagName('li')

for (var i = 0; i < lis.length; i++) {
  (function(i) {
    lis[i].onclick = function() {
      console.log(i)
    }
    // setTimeout(function() {
    //   console.log(i)
    // }, 100)
  })(i)
}
```

#### 立即执行嵌套
```js
(function immediateA(a) {
  return (function immediateB(b) {
    console.log(a) // 0
  })(1)
})(0)
```

#### 立即执行遇上块级作用域
```js
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1
    console.log(count)
  }
  console.log(count)
})()
```

#### 拆分执行 多个闭包
```js
function createIncrement() {
  let count = 0
  function increment() {
    count++
  }
  let message = `count is ${count}`

  function log() {
    console.log(message)
  }
  return [increment, log]
}

const [increment, log] = createIncrement()
increment()
increment()
increment()
log() // count is 0
```

#### 实现私有变量
```js
function createStack() {
  return {
    items: [],
    push(item) {
      this.items.push(item)
    }
  }
}
const stack = {
  items: [],
  push: function() {}
}

function createStack() {
  const items = []
  return {
    push(item) {
      items.push(item)
    }
  }
}
```