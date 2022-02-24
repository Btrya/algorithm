<template>
  <div>
    <router-link to="/" tag="span">首页</router-link>
    <router-link to="/about" tag="span">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>