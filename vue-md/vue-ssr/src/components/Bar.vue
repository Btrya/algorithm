<template>
  <div class="bar">
    Bar
    {{$store.state.name}}
    {{$store.state.age}}
  </div>
</template>

<script>
export default {
  name: 'Bar',
  asyncData(store) { // 这个方法只能在后端使用
    return store.dispatch('changeAll')
  }
}
</script>

<style>
.bar {
  color: blue;
}
</style>