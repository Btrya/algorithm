## Vue SSR渲染的优势
- SSR 服务端渲染 页面在服务端渲染后 返回给前端
- spa 页面 <div id="app"></div> 无法爬去dom元素 不利于seo优化
- 多页应用有利于seo优化 像原生开发页面可以建立很多html 去实现seo
- vue-server-render vue实现了可以在node中解析vue 实现将实例渲染成一个字符串

页面渲染完后发起ajax请求数据，用请求来的数据渲染页面(js很大，首屏白屏问题)
服务端渲染在后台中请求数据直接用于渲染(可以减少白屏时间)

### spa页面seo优化
预渲染 (启动一个浏览器 生成html，家在这个页面的时候先显示这个html再替换 适合一些静态页面) 
服务端渲染 （更好）
data-server-render

## SSR的缺陷
- SSR会占用很多服务器内存
- 浏览器一些api无法正常使用了 (只有beforeCreate created能用)


## 实现

通过一份代码打包出两份代码 -> 用node 渲染服务端打包后的结果 -> 字符串(没有交互能力) -> 再把另一份打包的结果插入到页面中(实现交互功能)


### 配置一个vue的开发环境
- webpack(打包) webpack-cli(解析参数) webpakc-dev-server(webpack开发环境)
- vue-loader(解析.vue文件) vue-style-loader(支持服务端渲染) css-loader(处理css) vue-template-compiler(解析template标签)
- @babel/core(babel核心模块) @babel/preset-env(高级语法转换成低级语法)
- babel-loader(解析js文件)
- html-webpack-plugin(打包html插入到页面中) 
- webpack-merge(webpack合并文件)