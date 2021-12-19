import { initState } from "./state.js"
import { compileToFunction } from './compiler/index.js'
import { mountComponent, callHook } from "./lifecycle.js"
import { mergeOptions } from './util/index.js'
import { nextTick } from "./util/next-tick.js"
// 在原型上添加一个init方法
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    // 数据的劫持
    const vm = this // vue 中使用 thi.$options 指代的就是用户传递的属性
    // vm.constructor.options 将用户传递的 和 全局的进行一个合并 比如 A extends Vue
    vm.$options = mergeOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreate')
    // 初始化状态
    initState(vm) // 分割代码

    callHook(vm, 'created')

    // 如果用户传入了 el 属性，需要把页面渲染出来
    // 如果用户传入了 el 就要实现挂载流程
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    // 默认先会查找有没有render方法，没有render会采用template，template也没有就用el中的内容
    if(!options.render) {
      // 对模板进行编译
      let template = options.template
      if(!template && el) {
        template = el.outerHTML // 有兼容性问题，可以创建一个div然后扔进去
      }
      const render = compileToFunction(template)
      options.render = render
      // 我们需要将template 转化成 render方法 vue1.0 2.0有了虚拟dom
    }
    // options.render

    // 挂载这个组件
    mountComponent(vm, el)
  }
  // 用户调用的nextTick
  Vue.prototype.$nextTick = nextTick
}