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