import initMixin from './mixin.js'
import initAssetRegisters from './assets.js'
import { ASSETS_TYPE } from './const.js'
import initExtend from './extend.js'

export function initGlobalAPI(Vue) {
  // 整合了所有的全局相关的内容
  Vue.options = {}
  initMixin(Vue)
  // 初始化的全局过滤器 指令 组建
  ASSETS_TYPE.forEach(type => {
    Vue.options[type + 's'] = {}
  })

  Vue.options._base = Vue // _base 是vue的构造函数
  // 注册extend方法
  initExtend(Vue)
  initAssetRegisters(Vue)
}