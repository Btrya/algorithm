import History from './base'

const ensureSlash = () => {
  if (window.location.hash) { // firefox 不支持 得我window.location.href自己去截
    return
  }
  window.location.hash = '/'
}

export default class HashHistory extends History {
  constructor(router) {
    super(router)
    this.router = router
    // 如果使用hashHistory 默认如果没有hash 应该跳转到 首页 #/
    ensureSlash()
  }
  getCurrentLocation() {
    return window.location.hash.slice(1) // #/about
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      // 再次执行匹配
      this.transitionTo(this.getCurrentLocation())
    })
  }
}