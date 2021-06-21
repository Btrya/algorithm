## Generator 和 Async 简介

### 迭代器 Iterator

迭代器 Iterator 是ES6 引入的一个钟新的遍历机制，同时也是一种特殊对象，它具有一些专门为迭代过程设计的专有接口。

每个迭代器对象都有一个next()方法，每次调用都返回一个当前结果对象，当前结果对象中有两个属性：

1. value：当前属性的值
2. done： 用于判断是否遍历结束，当没有更多可返回的数据时，返回true

每调用一次next()方法，都会返回下一个可用的值，直到遍历结束。

### 生成器 Generator

生成器是一种返回迭代器的函数，通过functuion关键字后的星号(*)来表示，函数中会用到新的关键字yield，星号可以紧挨着function关键字，也可以在中间添加一个空格。

```js
function generator() {
  const list = [1, 2, 3]
  for (let i of list) {
    yield i;
  }
}

let g = generator()

console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 2, done: false}
console.log(g.next()) // {value: 3, done: false}
console.log(g.next()) // {value: undefined, done: true}
```

### 特性

1. 每当执行完一条yield语句后函数就会自动停止执行，直到再次调用next();
2. yield关键字只可在生成器内部使用，在其他地方使用会导致程序抛出错误;
3. 可以通过函数表达式来创建生成器，但是不能使用尖头函数
   `let generator = function *() {}`

### Async 和 Await

```js
function longTimeFn(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

async function test() {
  const value = await longTimeFn(2000)
  console.log(value) // 2000
}

test()
```

### async await 和 promise

都是为了解决回调地狱

async await 只是相当于把 promise 变成一种同步的写法