// Vue 的核心代码 只是Vue的一个声明
import { initMixin } from './init' 
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle';
import { initGlobalAPI } from './initGlobalAPI/index.js'

function Vue(options) {
  // 进行Vue的初始化操作
  this._init(options)
}

// 通过引入文件的方式 给Vue原型上添加方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)


// 初始化全局的api
initGlobalAPI(Vue)

export default Vue