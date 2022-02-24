export default {
  // this 指代的是当前组件
  name: 'router-link',
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String
    }
  },
  render(h, { parent, props, slots }) {
    let tag = props.tag || 'a'
    const clickHandler = () => { // 指定跳转方法
      parent.$router.push(props.to)
      // 调用$router中的push 方法
    }
    return h(tag, {
      on: {
        click: clickHandler
      }
    }, slots().default)
  }
}