import RouterLink from "./components/router-link"
import RouterView from "./components/router-view"

export let Vue
const install = function(_Vue) {
  // install 方法内部一般会用来定义一些全局的内容 比如指令、全局组件、给原型扩展方法
  Vue = _Vue
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)

  // 用户将router属性注册到了new Vue

  // 希望每个字组件 都可以获取到 router 属性
  Vue.mixin({
    beforeCreate() { // mixin 可以给 beforeCreate 这个生命周期增加合并的方法
      // 有router说明是根实例
      if (this.$options.router) {
        // 根
        this._routerRoot = this // 就是将当前根实例放到了_routerRoot
        this._router = this.$options.router
        // 当前用户的router属性
        this._router.init(this) // 调用插件中的init方法
        // 如果用户更改了 current 是没有效果的 需要把_route也进行更新
        Vue.util.defineReactive(this, '_route', this._router.history.current) 
      } else {
        // 儿子
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
      // 这里所有的组件都拥有了 this._routerRoot
    },
  })
  Object.defineProperty(Vue.prototype, '$route', { // 存放的都是属性 path mathced
    get() {
      return this._routerRoot._route // 取current
    }
  })
  Object.defineProperty(Vue.prototype, '$router', { // 存放的都是属性 path mathced
    get() {
      return this._routerRoot._router // 取到router实例
    }
  })
}
export default install