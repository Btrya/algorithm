import { mergeOptions } from "../util/index.js"
export default function initExtend(Vue) {
  // 为什么要有子类 和 父类  new Vue (vue的构造函数)
  // 创建子类 和父类没有关系 但是可以继承父类 扩展的时候都扩展到自己的属性
  let cid = 0
  Vue.extend = function(extendOptions) {
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.cid = cid++
    Sub.prototype = Object.create(this.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(this.options, extendOptions)
    Sub.mixin = this.mixin
    // mixin use ...compoennt
    return Sub
  }
}