import { ASSETS_TYPE } from './const.js'
export default function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach(type => {
    Vue[type] = function(id, definition) {
      if (type === 'component') {
        // 注册全局组件
        // 使用extend 方法将对象编程构造函数
        // 子组件可能也有这个 Vue.component 方法
        definition = this.options._base.extend(definition) // = Vue.extend(definition)
      } else if (type === 'filter') {
        
      } else if (type === 'direactive') {

      }
      this.options[type + 's'][id] = definition
    }
  })
}