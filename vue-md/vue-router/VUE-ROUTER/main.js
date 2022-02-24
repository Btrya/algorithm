import Vue from 'vue';
import App from './App.vue'
import router from './router/index.js'

// @vue/cli-service-global
new Vue({
  name: 'root',
  el: "#app",
  render: h => h(App),
  router //让所有组件都能获取到router属性
})

// 单页应用 可以实现组件的切换

// 首页            /
// 关于页面         /about

// 多页应用 1个页面1个html

// 前端路由常见的两个方案 hash 模式  #aa #bb （浏览器的历史记录） 栈型结构 内部通过两个栈来实现的
//                              通过#后面路径的方式进行切换 window.location.hash = '/about'
//                              window.onhashchange = function(){} 渲染对应路径的组件
//                    history 模式  window.history.pushState({}, null, '/aaaa') 可以实现增添路径 但是强制刷新还是有问题 （靠服务端来解决这个问题）
//                                 window.onpopstate = function(){} 监控浏览器路径的变化
// vue-router 源码中在hash模式下 如果支持 onpopstate 会优先采用，如果低版本浏览器 会采用 onhashchange