<template>
  <div class="foo" @click="handleClick">
    Foo
  </div>
</template>

<script>
export default {
  name: 'Foo',
  methods: {
    handleClick() {
      console.log(1)
    }
  },
}
</script>

<style>
.foo {
  color: pink;
}
</style>