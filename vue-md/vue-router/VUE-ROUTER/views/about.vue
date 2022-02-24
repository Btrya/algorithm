<template>
  <div>
    <h1>About</h1>
    <router-link to="/about/a">go to a</router-link>
    <router-link to="/about/b">go to b</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'About',
}
</script>

<style>

</style>