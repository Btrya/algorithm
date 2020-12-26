/**
 * Js实现
 * Node.js 事件分发 EventEmitter类
 */
// Node.js 使用
// const EventEmitter = require('events').EventEmitter // 引入events模块中的EventEmitter
// const event = new EventEmitter()  // 创建eventEmitter对象
// event.on('some_event', () => {
//   console.log('some_event 触发')
// })
// setTimeout(() => {
//   event.emit('some_event')
// }, 1000);

/**
 * 我们要实现的API有：
 * on(event, listener)：为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
 * emit(event, [arg1], [arg2])： 按监听器的顺序执行执行每个监听器
 * addListener(event, listener)：on的同名函数（alias）
 * once(event, listener): 和on类似，但只触发一次，随后便解除事件监听
 * removeListener(event, listener)： 移除指定事件的某个监听回调
 * removeAllListeners([event])：移除指定事件的所有监听回调
 * setMaxListeners(n)：用于提高监听器的默认限制的数量。（默认10监听回调个产生警告）
 * listeners(event)： 返回指定事件的监听器数组。
 */
// 构造函数
function EventEmitter() {
  this.listeners = {}  // 用于存放事件监听器函数，结构为{ 'event1': [f1, f2, f3], 'event2': [f1, f2], ... }
  this.maxListener = 10 // 默认10监听回调个产生警告
}

/**
 * on方法
 * 1. 判断监听器数量是否超过限制，超过则警告
 * 2. 判断该事件监听器数组是否初始化，如果还没初始化，就把listener[event]初始化为数组，加入监听器callback
 * 3. 如果已经被初始化，则判断数组中是否存在callback，不存在则添加，存在则不做处理
 * 4. 指定addListener等于on方法
 * @param event 事件
 * @param listener 回调函数
 */
EventEmitter.prototype.on = function(event, callback) {
  let listeners = this.listeners
  if (listeners[event] && listeners[event].length >= this.maxListener) {
    throw console.error('监听器的最大数量是%d，已超出限制', this.maxListener)
  }
  if (listeners[event] instanceof Array) {
    if (listeners[event].indexOf(callback) === -1) {
      listeners[event].push(callback)
    }
  } else {
    listeners[event] = [].concat(callback)
  }
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on

/**
 * emit方法
 * 1. 通过Array.prototype.slice.call(arguments)取出参数列表args (考虑兼容所以采取这种方式)
 * 2. 调用args.shift剔除第一个参数即event，留下来的参数即为监听器的
 * 3. 遍历监听器，通过apply方法吧上面得到的args参数传进去
 * @param event 事件
 * @param [arg1], [arg2], ...  其他参数
 */
EventEmitter.prototype.emit = function(event) {
  let args = Array.prototype.slice.call(arguments)
  args.shift()
  this.listeners[event].forEach(item => {
    item.apply(null, args)
  })
}

/**
 * removeListener方法
 * 1. 通过indexOf确定监听器回调在数组listeners[event]中的位置
 * 2. 通过splice(i, 1)删除
 * @param event 事件
 * @param listener 回调函数
 */
EventEmitter.prototype.removeListener = function(event, callback) {
  let listeners = this.listeners
  let arr = listeners[event] || []
  let index = arr.indexOf(callback)
  if (index >= 0) {
    listeners[event].splice(index, 1)
  }
}

/**
 * once方法
 * 1. 结合on和removeListener方法，用on监听，回调结束后用removeListener移除
 * @param event 事件
 * @param listener 回调函数
 */
EventEmitter.prototype.once = function(event, callback) {
  let self = this
  function fn() {
    let args = Array.prototype.slice.call(arguments)
    callback.apply(null, args)
    self.removeListener(event, fn)
  }
  this.on(event, fn)
}

/**
 * removeAllListeners方法
 * 1. 清空listeners[event]数组
 * @param event
 */
EventEmitter.prototype.removeAllListeners = function(event) {
  this.listeners[event] = []
}

/**
 * setMaxListeners方法
 * 1. 直接修改maxListener的数量
 * @param num
 */
EventEmitter.prototype.setMaxListeners = function(num) {
  this.maxListener = num
}

/**
 * listeners方法
 * 1. 获取对应event的数组
 * @param event
 */
EventEmitter.prototype.listeners = function(event) {
  return this.listeners[event]
}

const myEvent = new EventEmitter()
myEvent.once('some_event', () => {
  console.log('some_event 触发')
})
setTimeout(() => {
  myEvent.emit('some_event')
  myEvent.emit('some_event')
  myEvent.emit('some_event')
  myEvent.emit('some_event')
}, 1000);
