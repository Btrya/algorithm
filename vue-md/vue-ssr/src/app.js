import Vue from "vue";
import App from './App.vue'
import createRouter from "./createRouter";
import createStore from "./createStore";

export default () => {
  let router = createRouter()
  let store = createStore()
  let app = new Vue({
    // el: "#app",
    router, // 注入路由
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
