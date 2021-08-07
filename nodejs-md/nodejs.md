### path.js
join 和 resolve api的异同点
 * 相同点： 支持任意参数，拼接成系统合法的路径 支持'..'等路径参数
 * 不同点： join只拼参数，resolve绝对路径之后补充参数路径
```js
const path = require('path');

const resolvePath = path.resolve('a', 'b', 'c')
const joinPath = path.join('a', 'b', 'c')

console.log(resolvePath)
console.log(joinPath)
```

__dirname 和 __filename
文件夹名称 和 文件名称，打印到当前文件的绝对路径

```js
console.log(path.extname(__filename)) // 后缀
console.log(path.basename(__filename)) // 文件名
console.log(path.dirname(__filename)) // 文件夹路径
```


### fs.js

readFile是异步的，返回的最后一个参数一定是回调函数，回调函数的第一个是err
readFileSync是同步的，会阻塞

```js
const fs = require('fs')

const path = require('path')

const pathToFile = path.resolve(__dirname, './text')

// error first
fs.readFile(pathToFile, 'utf-8', function(err, result) {
  if (err) {
    console.log('error', err)
    return err
  }
  console.log('result', result)
})

const content = fs.readFileSync(pathToFile, 'utf-8')
console.log('sync content', content)
```

#### readFile promise 封装
```js
function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push(function(err, result) {
        if (err) return reject(err)
        return resolve(result)
      })
      return func.apply(func, args)
    })
  }
}

const readFileAsync = promisify(fs.readFile)
readFileAsync(pathToFile, 'utf-8').then(content => {
  console.log(content)
}).catch(err => {
  console.log('error', err)
})
```

### http.js
启动服务器
```js
const http = require('http')

const proxy = http.createServer((req, res) => {
  res.writeHead(200, {'x-Asaki': 'hello-Btrya'}) // 设置请求头
  res.end('hello world')
})

proxy.listen('8888', '127.0.0.1', () => {
  console.log('server start')
})
```

### vm.js
```js
// require.js
const vm = require('vm')
const fs = require('fs')
const path = require('path')

const pathToFile = path.resolve(__dirname, './require-index.js')
const content = fs.readFileSync(pathToFile, 'utf-8')

const script = new vm.Script(content, {
  filename: 'index.js'
})

const result = script.runInThisContext() // hello world 124

// require-index.js
let a = 123

console.log('hello world', a + 1)
```

#### 封装一个require
```js
// requrie.js
const vm = require('vm')
const fs = require('fs')
const path = require('path')

function r(filename) {
  const pathToFile = path.resolve(__dirname, filename)
  const content = fs.readFileSync(pathToFile, 'utf-8')

  const wrapper = [
    '(function(require, module, exports, __dirname, __filename) {', // 可以注入任意多的变量
    '})' 
  ]

  const wrappedContent = wrapper[0] + content + wrapper[1]

  const script = new vm.Script(wrappedContent, {
    filename: 'index.js'
  })
  const result = script.runInThisContext()

  const module = {
    exports: {}
  }
  result(r, module, module.exports)
  return module.exports
}

global.r = r

// 引入这个require
require('./require')

const result = r('./require-module.js')
console.log(result)

// require-module.js
module.exports = 'module test'
```

### Buffer

##### 背景知识
1. ArrayBuffer
  
可以把 ArrayBuffer 理解为一块内存，具体存什么需要额外的声明。
代表的是一个 通用的、固定长度的原始二进制数据缓冲区。

  - ArryaBuffer能够直接操作吗？
  不能直接操作，通过类型数组对象来操作(TypedArray). 将缓冲区重的数据表示为特定的格式。

2. Unit8Array

表示一个8位的无符号整形数组，创建的时候内容被初始化为0

字节btye = 8位bit
js Number 64位 = 8byte

3. ArrayBuffer 和 TypedArray 的关系是什么？

TypedArray: Uint8Array, Int32Array, Int16Array

ArrayBuffer: 本事是一个 0 和 1 存放在一行里的一个集合

  - 可以用一个Int8的确定类型数组来分离存放8位的二进制字节
  - 用一个无符号的Int16来分离存放16位的二进制字节

4. 总结： 

ArrayBuffer 扮演了一个原生内存的角色。

##### NodeJs Buffer

Buffer 实现了 Uint8Array 的api

Buffer 的实例 => 整形数组

Buffer的大小是固定过的，在创建的时候就确定了，无法调整。

##### Tips

1. 当调用Buffer.allocUnsafe()时，被分配的内存段是未初始化的。
   内存的分配非常快，但是分配的内存段可能包含潜在的旧数据。
   具有明显的性能优势，但是如果使用不当，会给程序引入安全漏洞。

##### Buffer 与 字符编码

Buffer 的实例一般用于表示编码字符的序列，UTF-8，Base64，十六进制

v2ex 论坛， 留微信号用的就是base64

1. ascii - 仅支持7位的ASCII数据
2. utf-8 - 多字节编码的Unicode字符，html
3. base64 - 当从字符串创建buffer的时候，这种编码找到对应的code加密
### Stream

流

shell 通过管道链接各个部分，输入和输出的规范是文本流。

Nodejs，内置的Stream模块实现了类似的功能，各个部分之间通过pipe()

```js
const Stream = require('stream')

const Readable = Stream.Readable
const Writable = Stream.Writable
const Duplex = Stream.Duplex
const Transform = Stream.Transform
```

##### Readable

创建可读流

```js
const Stream = require('stream')
/**
 * 可读流 Readable
 */
const Readable = Stream.Readable

class ToReadable extends Readable {
  constructor(iterator) {
    super()
    this.iterator = iterator
  }

  _read() {
    const res = this.iterator.next()
    if (res.done) {
      // 数据源已经消耗完了，通过Push null 通知流
      return this.push(null)
    }
    setTimeout(() => {
      this.push(res.value + '\n')
    }, 0);
  }
}

const iterator = function(limit) {
  return {
    next: function() {
      if (limit--) {
        return { done: false, value: limit + Math.random() }
      }
      return { done: true }
    }
  }
}(10000)

const readbale = new ToReadable(iterator)

readbale.on('data', data => process.stdout.write(data))
readbale.on('end', () => process.stdout.write('end'))
```

创建可读流的时候，需要继承Readable，并且实现_read方法。

* _read是生产数据的逻辑
* 在_read方法中，通过调用push(data)将数据放入可读流中供下游消耗
* 当全部数据生产完成后，必须push(null)来通知流结束
* 当可读流结束之后，就不能再调用push(data)了

可以通过坚挺 data 事件消耗可读流

* 在首次监听data事件，readable 会不断的调用 _read方法生产数据
* 当所有的数据生产完毕，会触发 end 事件

##### Writable

创建可写流

```js
const Stream = require('stream')
const Writable = Stream.Writable

const writable = Writable()

// push
writable._write = function(data, enc, next) {
  // 将流中的数据输出
  process.stdout.write(data.toString().toUpperCase())
  // 当写入完成时，通知流传入下一个数据
  process.nextTick(next)
}

writable.on('finish', () => process.stdout.write('DONE'))

writable.write('a' + '\n')
writable.write('b' + '\n')
writable.write('c' + '\n')

writable.end()
```

* 上游通过调用 write 方法来写入数据到可写流中
* write方法实际上调用的是我们重写过的_write方法
* 在_write中，当数据成功写入后，需要调用next告诉流开始处理下一个数据
* 上游必须调用end方法来结束可写流
* end方法调用之后，会触发 finish 事件

##### tips

为什么一定要 toString 处理 ？

因为输入的默认是buffer，需要转成string来读写
##### Duplex

创建可读可写流

```js
/**
 * Duplex 可读可写流
 */
const Duplex = Stream.Duplex

const duplex = Duplex()

duplex._read = function() {
  this._readNum = this._readNum || 0;
  if (this._readNum > 3) {
    this.push(null)
  } else {
    this.push(`${this._readNum++}`)
  }
}

duplex._write = function(buf, enc, next) {
  process.stdout.write(`_write ${buf.toString()}\n`)
  next()
}

duplex.on('data', data => console.log(`ondata = ${data.toString()}`))

duplex.write('a')
duplex.write('b')
duplex.write('c')
duplex.write('d')
duplex.write('e')

duplex.end()
```

##### Transform

可读流中的数据 0，1
可写流中的数据 a, b, c

在 Transform 中可写端写入的数据，经过自动变换后可以自动添加到可读端

Transform extends Duplex，实现了 _write 和 _read 方法，_transform。

##### 数据类型

data.toString()

shell 管道连接上下游，标准的文本流

可读流：push(data) data: string || Buffer
消耗data的时候，data事件输出的数据都是Buffer
可写流：write(data) data: string || Buffer
_wirte(data) Buffer

NodeJs Stream中的数据流都是Buffer类型

### Events

EventEmitter 是同步的
手动实现 EventEmitter

```js
class EventEmitter1 {
  constructor() {
    this.events = {}
  }
  // 触发监听事件
  emit(event, ...args) {
    const cbs = this.events[event]
    if (!cbs) {
      console.log(`当前事件未注册`)
      return this
    }
    cbs.forEach(cb => cb.apply(this, args))
    return this
  }
  // 创建监听事件
  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(cb)
    return this
  }
  // 触发监听一次的事件
  once(event, cb) {
    const func = (...args) => {
      this.off(event, func)
      cb.apply(this, args)
    }
    this.on(event, func)
    return this
  }
  // 移除监听事件
  off(event, cb) {
    this.events[event] = []
    return this
  }
}
```

### 全局对象解析

node： global
浏览器： window

global = {
  Buffer: {},
  console,
  setTimeout,
  setInerval,
  clearTimeout,
  clearInterval,
  process,
}

1. exit 
当进程准备退出时触发

2. uncauhtException

```js
const a = new Promise((resolve) => {
  // 一些错误但是没catch 就会到 uncauhtException 里
})
```


### 事件循环模型

##### 什么是事件循环？
事件循环使nodejs 可以通过将操作转移到系统内核中来执行非阻塞 I/O 操作（尽管js是单线程的）

由于大多数现代内核都是多线程的，因此他们可以处理在后台执行的多个操作。当这些操作之一完成时，内核会告诉nodejs，以便可以将适当的回调添加到轮询队列中以最终执行。

nodejs启动时，它将初始化事件循环，处理提供的输入脚本，这些脚本可能会进行异步 API 调用，调度计时器或调用 process.nextTick，然后开始处理事件循环

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

每个阶段都有一个要执行的回调 FIFO 队列，尽管每个阶段都有其自己的特殊方式，但是通常，当事件循环进入给定阶段时，它将执行该阶段特定的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或执行回调的最大数量为止。当队列已为空或达到回调限制时，事件循环将转移到下一个阶段，以此类推

1. timers: setTimerout 和 setInterval 的回调
2. pending callbacks: 推迟到下一个循环迭代的 I/O 回调
3. idle, prepare: 系统内部使用
4. poll: 执行与 I/O 相关的回调，除了 timers, close callback, setImmedate, 其他的回调都在这里执行
5. check: setImmedate回调
6. close callbacks: 一些关闭的回调，socket.on('close', () => {})

#### setImmediate 和 setTimeout 的区别

基本行为相似，但是在不同时机下的调用，行为会发生改变

* setImmediate在当前poll阶段完成后执行
* setTimeout 以毫秒为最小阈值，执行脚本

1. 主模块中执行
  两者的执行顺序是不固定的，可能timeout在前，可能immediate在前

```js
setTimeout(() => {
  console.log('timeout')
}, 0);

setImmediate(() => {
  console.log('immediate')
});
```

2. 在同一个I/O回调中执行
setImmediate总是最先执行
```js
const fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('fs timeout')
  }, 0);
  
  setImmediate(() => {
    console.log('fs immediate')
  });
})

```

问题： 为什么在主模块中两者的执行顺序不固定呢？
答： 在主代码部分执行setTimeout设置定时器，setImmediate 写入 check 队列

第一阶段是 timers， timers队列可能为空，也可能存在回调
timers 队列为空 => check setImmediate => timers setTimeout
timers 队列里有回调 setTimeout => check setImmediate

### nextTick在事件循环中的位置

```
           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        |  |     idle, prepare         │
        |  └─────────────┬─────────────┘
  nextTickQueue     nextTickQueue
        |  ┌─────────────┴─────────────┐
        |  │           poll            │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │           check           │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        └──┤       close callbacks     │
           └───────────────────────────┘
```

### 微任务

Node

1. process.nextTice()回调
2. Promise.then()

优先级 process.nextTice() > Promise.then()