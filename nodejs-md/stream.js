// const fs = requrie('fs')

// // 创建一个可读流
// fs.createReadStream('xxx.js').pipe(process.stdout)

const Stream = require('stream')
/**
 * 可读流 Readable
 */
const Readable = Stream.Readable

// class ToReadable extends Readable {
//   constructor(iterator) {
//     super()
//     this.iterator = iterator
//   }

//   _read() {
//     const res = this.iterator.next()
//     if (res.done) {
//       // 数据源已经消耗完了，通过Push null 通知流
//       return this.push(null)
//     }
//     setTimeout(() => {
//       this.push(res.value + '\n')
//     }, 0);
//   }
// }

// const iterator = function(limit) {
//   return {
//     next: function() {
//       if (limit--) {
//         return { done: false, value: limit + Math.random() }
//       }
//       return { done: true }
//     }
//   }
// }(10000)

// const readbale = new ToReadable(iterator)

// readbale.on('data', data => process.stdout.write(data))
// readbale.on('end', () => process.stdout.write('DONE'))

/**
 * 可写流
 */
const Writable = Stream.Writable

const writable = Writable()

// push
// 这里的data有可能是 buffer 或者 string
writable._write = function(data, enc, next) {
  // 将流中的数据输出， 这里要调用toString，因为要保证输入和输出都是文本流
  process.stdout.write(data.toString().toUpperCase())
  // 当写入完成时，通知流传入下一个数据
  process.nextTick(next) // 异步的 这里用next()就是同步的
}

// writable.on('finish', () => process.stdout.write('DONE'))

// writable.write('a' + '\n')
// writable.write('b' + '\n')
// writable.write('c' + '\n')

// writable.end()

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

// duplex.on('data', data => console.log(`ondata = ${data.toString()}`))

// duplex.write('a')
// duplex.write('b')
// duplex.write('c')
// duplex.write('d')
// duplex.write('e')

// duplex.end()

/**
 * 
 */
const readable1 = Readable()

readable1.push('a')
readable1.push('b')
readable1.push('c')

readable1.on('data', data => console.log(data))