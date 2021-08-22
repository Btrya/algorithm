## Vue 路由及异步组件

### 背景

ssr: server side render

服务端渲染的多页应用

缺点：
1. 维护特别麻烦
2. 服务器压力大
3. 没有前后端分离，协作流程不清晰

优点：
1. SEO效果好，因为是已经完全渲染好的页面
2. 用户看到首屏的耗时会比较小

www.btrya.com/index => php服务器 => index.html
              /parent => php服务器 => parent.html

php 服务端代码 -> jquery -> 

### 现阶段的路由

单页应用 spa simple page application

不仅在页面的交互中是不刷新页面的，就连页面跳转(router.push)也是不刷新页面

www.btrya.com/index => cdn => index.html app.js
www.btrya.com/list => cdn => list.js

webpack => 将静态文件 .js img html css 上传到 oss, => cdn

### 前端路由的特性

1. 根据不同的 url 渲染不同的内容
2. 不刷新页面

### Hash 路由原理及其实现

* hash 路由的改变，会在url上有什么表现吗
* hash具体是怎么改变路由的？html元素？js？
* 如何通过js监听hash路由改变呢？
* 可以通过哪些方式来改变浏览器hash

特性：

* url中hash值至客户端/浏览器端的一种状态，向服务器发送请求的时候，hash部分是不会携带的
* hash值的更改并不会导致页面的刷新
* hash值的更改，会在浏览器的访问历史中增加记录
* hash值的更改能通过 hashchange 事件监听

例子：

<a href="#"></a>

location.hash = '#hash-change'

### history路由

hash 虽然能解决问题，但是带有#不太美观

window.history.back()
window.history.forward()
go(number)
pushState  新增 => A B => A B C
replaceState 覆盖/代替 A B => A C

1. 可以使用Popstate事件来监听url变化
2. pushState和replaceState 并不会触发 Popstate
3. 哪些情况会触发Popstate？  浏览器的回退/前进按钮  history back forward go

参数 
1. state: 是一个对象，是一个与指定网址相关的状态对象，如果不需要，可以填null
2. title: 新页面的标题，null
3. url: 新的网址，必须与当前页面处在同一个域，浏览器的地址栏辉县市这个网址

部署history路由的时候，要记住，要使你路由中的所有Path都访问到index.html文件

www.btrya.com/green
www.btrya.com/index.html

nginx {
  location /green {
    index.html
  }
}