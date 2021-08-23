## VueRouter

1. vue router 从列表 浏览了一段时间，点击进了一个详情页，然后返回的时候，我期望回到列表页还是停留在原来的浏览器位置，你可以怎么做？

* keep-alive
* localStorage/sessionStorage + scrollTop + scrollTo
* scrollBehavior

2. router-view 是什么？

类似于动态的组件

找到当前路径对应的component，并展示出来

1. 异步加载

首屏 app.js chunk-vendors 2.4MB 159kb
About about.js 21kb

2. 同步加载

首屏 app.js chunk-vendors 2.4MB 180kb
About

## 导航守卫的执行顺序

1. [组件] 前一个组件的beforeRouterLeave
2. [全局] router.beforeEach
3. [路由参数变化] beforeRouteUpdate
4. [配置文件里] beforeEnter
5. [组件] beforeRouterEnter
6. [全局] afterEach

## scrollBehavior 生效的条件

1. 浏览器支持的 History api
2. 点击浏览器的 返回/前进按钮
3. router-link是不可以触发的