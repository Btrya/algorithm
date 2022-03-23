<template>
  <div id="app">
    <router-link to="/">foo</router-link>
    <router-link to="/bar">bar</router-link>

    <!--默认应该告诉服务端线渲染哪个组件-->
    <router-view></router-view>
    <!--前端路由通过historyapi实现-->
    <!--只有强制刷新才需要服务端渲染，默认 vue-ssr 只有首屏刷新的那一屏时通过服务端渲染的后续逻辑都是通过前端路由实现的 -->
    <!--渲染一个页面时如果服务端不存在这个路径 需要将他跳转到首页再通过前端路由跳转-->
  </div>
</template>

<script>
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'

export default {
  name: 'App',
  components: {
    Bar,
    Foo
  }
}
</script>

<style>

</style>