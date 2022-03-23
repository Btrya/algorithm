const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const fs = require('fs')
const Router = require('@koa/router')

let app = new Koa()  // 创建一个服务实例
let router = new Router()  // 创建路由实例

const template = fs.readFileSync('./temp.html', 'utf8')
let vm = new Vue({
  data() {
    return  {
      name: 'Btrya'
    }
  },
  template: '<div>hello {{name}}</div>'
})

let render = VueServerRenderer.createRenderer({ // 传入读取的文件 将渲染结果插入到 vue-ssr-outlet
  template
})

// 注册路由
router.get('/', async (ctx) => { // ctx表示上下文 包含浏览器和服务端的 req/res的信息
  ctx.body = await render.renderToString(vm) // 用渲染器将vue的实例渲染成一个字符串
})

app.use(router.routes()) // 将路由注册
app.listen(3000) // 监听3000端口

// nodemon 可以监视代码变化重新启动