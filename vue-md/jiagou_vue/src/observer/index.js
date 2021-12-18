// 把data中的数据 都是用Object.defineProperty 重新定义 es5
// Object.defineProperty 兼容性不好，不能兼容ie8及以下
import { arrayMethods } from './array.js'
import { isObject, def } from "../util/index"
import Dep from './dep.js'

class Observer {
  constructor(value) {
    this.dep = new Dep // 单独给数组用的
    // vue 如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
    // vue3 proxy 不需要递归 也不需要增加set和get方法
    // 给每一个监控过的对象都增加一个__ob__属性
    // Object.defineProperty(value, '__ob__', {
    //   enumerable: false, // 不可枚举
    //   configurable: false, // 不可被配置
    //   value: this
    // })
    def(value, '__ob__', this)
    // 对数组监控
    if (Array.isArray(value)) {
      // 如果是数组的话 并不会对索引进行观测 因为会导致性能问题
      // 前端开发中 很少很少去操作索引 push shift unshift pop 数组方法重写
      value.__proto__ = arrayMethods // 函数劫持/代理
      // 如果数组里放的是对象我再监控
      this.observeArray(value)
    } else {
      // 遍历对象
      this.walk(value)
    }
  }
  walk(data) {
    let keys = Object.keys(data) // [name, age, address]
    keys.forEach((key, index) => {
      defineReactive(data, key, data[key]) // 定义响应式
    })
  }
  observeArray(arr) {
    for (let i = 0; i < arr.length; ++i) {
      observe(arr[i])
    }
  }
}

function defineReactive(data, key, value) {
  let dep = new Dep() // 这个dep是给对象用的
  // 这里这个value可能是数组 也可能是对象，返回的结果是observer的实例，当前这个value对应的observer
  let childOb = observe(value) // 递归实现深度检测
  // 闭包
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() { // 获取值的时候做一些操作 这里取到的每个属性都对应着自己的watcher
      if (Dep.target) { // 如果当前有watcher
        dep.depend() // 意味着我要将watcher存起来
        if (childOb) { // 数组的依赖收集
          childOb.dep.depend() // 收集了数组的相关依赖
          // 如果数组中还有数组
          if (Array.isArray(value)) {
            depenArray(value)
          }
        }
      }
      return value
    },
    set(newValue) { // 也可以做一些操作
      if (newValue === value) return
      observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
      value = newValue

      dep.notify() // 通知依赖的watcher来进行一个更新操作
    }
  })
}
function depenArray(value) {
  for (let i = 0; i < value.length; ++i) {
    let current = value[i] // 将数组中的每一个都取出来 数据变化后 也去更新视图
    // 数组中的数组的依赖收集
    current.__ob__ && current.__ob__.dep.depend()
    if (Array.isArray(current)) {
      depenArray(current)
    }
  }
}

export function observe(data) {
  let isObj = isObject(data)
  if (!isObj) {
    return
  }
  return new Observer(data) // 用来观测数据
}