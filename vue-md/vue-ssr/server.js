const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')
const static = require('koa-static')

let app = new Koa()  // 创建一个服务实例
let router = new Router()  // 创建路由实例

// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// 这个manifest存着client-entry端打包的信息
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const { resolve } = require('path')

let render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

app.use(async (ctx, next) => {
  // 如果访问不到就跳转到首页 加载首页时会调用前端路由 
  // history api 404问题的解决
  try {
    await next()
    if (!ctx.body) {
      ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url: ctx.url}, (err, html) => {
          if(err && err.code == 404) {
            resolve('404: Page Not Found')
          }
          resolve(html)
        }) // 用渲染器将vue的实例渲染成一个字符串
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// 注册路由 通过服务端渲染服务端打印后的结果
router.get('/', async (ctx) => { // ctx表示上下文 包含浏览器和服务端的 req/res的信息
  // 如果渲染的内容需要增添样式需要采用回调的方式
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString({url: ctx.url}, (err, html) => {
      resolve(html)
    }) // 用渲染器将vue的实例渲染成一个字符串
  })
})

// router.get('*', async ctx => {  
//   ctx.body = await new Promise((resolve, reject) => {
//     render.renderToString((err, html) => {
//       resolve(html)
//     })
//   })
// })

app.use(router.routes()) // 将路由注册
// 静态服务器资源
app.use(static(path.resolve(__dirname, 'dist')))

app.listen(3000) // 监听3000端口

// nodemon 可以监视代码变化重新启动