## Generator 和 Async 简介

### 协程
`async/await`是一个自动执行的 `Generator` 函数

`协程是一种比线程更加轻量级的存在。`
可以把协程看成是跑在线程伤的任务，`一个任务可以存在多个协程，但是在线程上同时只能执行一个协程。`
比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行， B 协程恢复执行; 同样，也可以从 B 协程中启动 A 协程。通常，`如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。`

正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。最重要的是，协程不是被操作系统内核所管理，而是完全`由程序所控制`（即在用户态执行）。这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源。

### 协程的四点规则
- 通过调用生成器函数 genDemo 来创建一个协程 gen , 创建之后, gen 协程并没有立即执行
- 要让 gen 协程执行，需要通过调用 gen.next
- 当协程正在执行的时候, 可以通过 yield 关键字来暂停 gen 协程的执行，并返回主要信息给父协程
- 如果协程在执行期间，遇到了 return 关键字，那么 JS 引擎会结束当前协程，并将 return 后面的内容返回给父协程

### 协程之间的切换
- gen 协程和父协程是在主线程上交互执行的，并不是并发执行的，它们之间的切换是通过 yield 和 gen.next 来配合完成的
- 挡在 gen 协程中调用了 yield 方法时， JS 引擎会保护 gen 协程当前的调用栈信息，并恢复父协程的调用栈信息。同样，当在父协程中执行 gen.next 时， JS 引擎会保存父协程的调用栈信息，并恢复 gen 协程的调用栈信息。
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

ES7引入 async await 只是相当于把 promise 变成一种同步的写法, `在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力`

其实 async await 的秘密就是 Promise 和 Generator 生成器应用，往低层说就是 微任务和协程应用。

#### async
根据 MDN 定义, async 是一个通过 `异步执行并隐式返回 Promise` 作为结果的函数
```js
aysnc function async1() {
  return '123'
}
console.log(async1()) // Promise {<fulfilled>: '123'}
```

#### await
```js
async function foo() {
  console.log(1)
  let a = await 100
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)

// 0 1 3 100 2
```