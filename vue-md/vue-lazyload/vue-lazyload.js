const getScrollParent = (el) => {
  let parent = el.parentNode
  while (parent) {
    if (/(scroll)|(auto)/.test(getComputedStyle(parent)['overflow'])) {
      return parent
    }
    parent = parent.parentNode
  }
  return parent
}
const loadImageAsync = (src, resolve, reject) => {
  let img = new Image()
  img.src = src
  img.onload = resolve
  img.onerror = reject
}
const Lazy = (Vue) => {
  class ReactiveListener {
    constructor({el, src, options, elRender}) {
      this.el = el
      this.src = src
      this.options = options
      this.elRender = elRender
      this.state = { loading: false } // 没有加载过
    }
    checkInView() { // 检测这个图片是否在可视区域
      let { top } = this.el.getBoundingClientRect()
      return top < window.innerHeight * (this.options.preLoad || 1.3)
    }
    load() { // 加载图片
      // 先加载loading
      // ok才显示图片
      this.elRender(this, 'loading')
      // 懒加载的核心就是 new Image
      loadImageAsync(this.src, () => {
        this.state.loading = true
        this.elRender(this, 'finish')
      }, () => {
        this.elRender(this, 'error')
      })
    }
  }
  return class LazyClass {
    constructor(options) {
      // 用户传入的属性
      this.options = options
      this.bindHandler = false
      this.listenerQueue = []
    }
    handleLazyLoad() {
      // 判断这个图片是否应该显示
      // 计算当前图片的位置
      this.listenerQueue.forEach((listener) => {
        if (!listener.state.loading) {
          let catIn = listener.checkInView()
          catIn && listener.load()
        }
      })
    }
    add(el, bindings, vnode) {
      // 找到父亲元素
      Vue.nextTick(() => {
        // 带有滚动的盒子
        let scrollParent = getScrollParent(el)
        if (scrollParent && !this.bindHandler) {
          this.bindHandler = true
          scrollParent.addEventListener('scroll', this.handleLazyLoad.bind(this))
        }
        // 判断这个元素是否在容器的可视区域中，如果不是就不用渲染
        const listener = new ReactiveListener({
          el,
          src: bindings.value,
          options: this.options,
          elRender: this.elRender.bind(this)
        })
        this.listenerQueue.push(listener)
        this.handleLazyLoad()
      })
    }
    elRender(listener, state) { // 渲染方法
      let el = listener.el
      let src = ''
      switch(state) {
        case 'loading':
          src = listener.options.loading || ''
          break;
        case 'error':
          src = listener.options.error || ''
          break;
        default:
          src = listener.src
          break;
      }
      el.setAttribute('src', src)
    }
  }
}

const VueLazyload = {
  install(Vue, options) {
    const LazyClass = Lazy(Vue)
    const lazy = new LazyClass(options)
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    })
  }
}