export default {
  // this 指代的是当前组件
  name: 'router-view',
  functional: true, // 函数式组件 函数不用new 没有this 没有生命周期 没有数据data 可以有props（context.props）
  render(h, { parent, data }) {
    // this.$route 有 matched 属性 这个属性有几个就依次的将他赋予到对应的router-view上
    // parent 是当前父组件 data是这个组件上的一些标识
    let depth = 0
    let route = parent.$route

    data.routerView = true // 标识路由属性
    while(parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      } 
      parent = parent.$parent
    }

    let record = route.matched[depth]
    if (!record) {
      return h() // 渲染一个null元素
    }
    return h(record.component, data)
  }
}