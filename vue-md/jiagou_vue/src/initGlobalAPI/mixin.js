import { mergeOptions } from '../util/index'
export default function initMixin(Vue) {
  Vue.mixin = function(mixin) {
    // 如何实现两个对象的合并
    this.options = mergeOptions(this.options, mixin)
  }
  // 生命周期的合并策略 [beforeCreate, beforeCreate]
  // Vue.mixin({
  //   a: 1,
  //   beforeCreate() {
  //     console.log('mixin 1')
  //   },
  // })
  // Vue.mixin({
  //   b: 2,
  //   beforeCreate() {
  //     console.log('mixin 2')
  //   },
  // })
}