/**
 * ArrayBuffer
 */
// const buffer = new ArrayBuffer(8)

// console.log(buffer)

// int16 int32
// const int16Buffer = new Int16Array(buffer)

// console.log(int16Buffer)

/**
 * Unit8Array
 */
// const unit8 = new Uint8Array(2)

// unit8[0] = 42
// console.log(unit8[0], unit8.length, unit8.BYTES_PER_ELEMENT)


// const arr = new Uint8Array([21, 31])
// console.log(arr[1])

/**
 * NodeJs Buffer
 * 这里的 Buffer 可以直接引用 因为他是一个全局对象
 */
// 创建一个长度为10，填充为0的Buffer
// const buf1 = Buffer.alloc(10)
// console.log(buf1)

// 创建一个长度为10，填充为1的Buffer
// const buf2 = Buffer.alloc(10, 1)
// console.log(buf2)

// allocUnsafe 比 alloc 更快，但是创建的缓冲区里可能存在旧数据
// const buf3 = Buffer.allocUnsafe(10) // 用fill、write可以重写他
// console.log(buf3)

/**
 * Buffer 与 字符编码
 */
const buf  = Buffer.from('hello world', 'ascii')

console.log(buf)

console.log(buf.toString('base64'))