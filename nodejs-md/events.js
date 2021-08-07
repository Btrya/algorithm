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

const event1 = new EventEmitter1()
// 链式调用 event1.on().emit()...

// EventEmitter是同步的
event1.on('msg', (data) => console.log(data))
event1.on('msg', (data) => console.log(`123123123${data}`))

event1.emit('msg', '11111')
console.log(2222)