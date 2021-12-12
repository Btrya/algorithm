import { observe } from "./observer/index.js"
import { proxy } from "./util/index.js"
export function initState(vm) {
  const opts = vm.$options
  // vue的数据来源：属性 方法 数据 计算属性 watch
  if (opts.props) {
    // 属性传递
    initProps(vm, opts.props)
  }
  if (opts.methods) {
    initMethods(vm, opts.methods)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
  // 数据初始化工作
  let data = vm.$options.data // 用户传递的data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  // 对象劫持 用户改变了数据 我希望可以得到通知 => 刷新页面
  // MVVM模式 数据变化可以驱动视图变化
  // Object.defineProperty() 给属性增加set方法和get方法

  // 为了让用户更好的使用 vm.name 代理到 vm._data.name
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data) // 响应式原理
}
function initComputed(vm) {}
function initWatch(vm) {}