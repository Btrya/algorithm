import createApp from './app.js'

// 服务端渲染打包需要返回一个函数
// 这个函数会在访问服务器时被调用，是在服务端执行的
export default (context) => {
  return new Promise((resolve, reject) => {
    // context 包含后端各种信息
    const { app, router, store } = createApp()
    // 服务端需要拿到一个vue的实例，而且每个用户都是全新的
    router.push(context.url) // 跳转时路由可能是异步加载的
    // 等待路由加载完毕再去通过实例渲染
    router.onReady(() => {
      // 前端没有配置这个路由 应该返回404页面
      // 跳转完毕后获取匹配到的组件个数
      const matchesComponents = router.getMatchedComponents()
      if (!matchesComponents.length) {
        return reject({code: 404})
      }
      // 匹配到路由了
      Promise.all(matchesComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData(store)
        }
      })).then(() => {
        // 将状态放到上下文的状态中 此时就会将这个状态放到window中
        context.state = store.state
        // 此方法可返回一个promise 返回最终的实例
        resolve(app)
      })
    }, reject)
  })

}