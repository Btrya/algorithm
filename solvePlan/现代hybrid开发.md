## 现代 Hybrid 开发与原理解析

1. Native App

具体分为 android 和 ios 系统

Java/Swift，C++， Obj C

优点：拥有最好的性能和最好的体验
缺点：开发和发布的成本非常高，两端需要不同的技术人员来维护，原生开发人员又非常稀缺。

2. Web App

H5应用， SPA MPA

js/ts，vue/react/angular(rxjs)

优点：
1. 开发和发布非常方便
2. 可以随时发布更新
3. 可以跨平台，调试非常方便
4. 不存在多版本的问题，维护成本很低

缺点：
1. 性能和体验比较一般
2. 受限于浏览器，能做的事情不多，兼容各种浏览器
3. 入口强依赖浏览器，只能以url的形式存在

3. RN / Weex 

4. Flutter
  
dart

### Hybrid 基本介绍

app -> webview -> h5

#### 微信jssdk

sdk中提供了什么样的方法，

```js
wx.config({
  appId: 'xxxxx'
})

wx.ready(() => {
  wx.onMenuShareAppMessage({
    title: 'abc',
    desc: '',
    link: '',
    imgUrl: ''
  })
})
```

### Hybrid 开发架构

最核心的是 Native 和 H5 的双向通讯，而这个通讯其实完全依赖于 native 提供的 webview 容器。

webview 到底有什么特点可以撑起这个双向通讯？
具体的通讯流程又是什么样子的？

主要有两种方式：

1. URL Schema: 客户端通过拦截webview请求来完成通讯
2. Native 像 webview 中的js执行环境注入 API，依次来完成通讯。(比如向 window 注入一些api)

#### URL Schema

1. 原理

webview中发起的请求，都会被客户端监听和捕获到

2. 定义自己的私有协议

http://ab.com/fetchInfo

所以需要定义一套h5和native交互的私有协议，我们通常称呼为URL Schema

btrya://

btrya://setLeftButton?title=xxx&desc=xxx

3. 请求的发送

webview中请求的发送，我们一般使用iframe的方式

```js
const doc = window.document
const body = doc.body
const iframe = doc.createElement('iframe')

iframe.style.display = 'none'
iframe.src = 'btrya://setLeftButton'

body.appendChild(iframe)

// 不靠谱的移除，一般会有 callback 来告诉你请求的结果，在这个callback里移除
setTimeout(() => {
  body.removeChild(iframe)
}, 200)
```

安全性，客户端一般情况会设置域名白名单，btrya.com 为白名单

4. 客户端拦截协议请求

iOS 和 Android

* iOS: shouldStartLoadWithRequest
* Android: shouldOverrideUrlLoading

5. 请求处理完成后的回调

callback

window.addEventListener, window.dispatchEvent

```js
webview.setLeftButton({ param1: 11 }, (err)=> {
 if (err) {
   console.error('执行失败')
   return
 }
 console.log('执行成功')
 // 业务逻辑
})
```

* H5调用setLeftButton方法的时候，需要通过 webviewapi的名称+参数 作为唯一标识，注册事件。

```js
const handlderId = Symbol()

const eventName = `setLeftButton_${handlderId}`

const event = new Event(eventName)

window.addEventListener(eventName, (res) => {
  if (res.dada.errcode) {
    // todo
    return
  }
  // todo
})

JsBridge.send('btrya://xxxxxxx')

```

* 客户端在接收到请求的时候，完成自己对应的处理，dispacthevent，携带回调的数据出发自定义事件

```js
event.data = { errcode: 0 }
window.dispatchEvent(event)
```

#### 注入API

上述方式有个比较大的缺点，如果参数太长，会被截断

native向js执行环境注入API

1. 向native传递信息

window.BtryaJsBridge = {
  ...
}

一般会对参数进行编码，比如转换为base64的格式

2. 准备接收natvie的回调

在window上去声明接收回调的api

```js
window['setLeftButton_Callback_1'] = (errcode, response) => {
  console.log(errcode)
}
```

3. native调用回调函数

```js
const callbackName = `setLeftButton_Callback_1`
window.BtryaJsBridge['setLeftButton']({
  ...params,
  trigger: callbackName
})
```

### 封装

```ts
interface WebviewP {
  callback?: Function;
  [key: string]: any
}

var require

const Buffer = require('buffer').Buffer

const UID_PREFIX = Date.now().toString()
const isNotInnerApp = !/Btrya/.test(window.navigator.userAgent)
let uid = 1

class Webview {
  private exec(name: string, params: WebviewParmas) {
    return this.addApi(name)[name](params)
  }

  private addApi(name: string) {
    if (!this[name]) {
      this[name] = (params) => {
        if (isNotInnerApp) return this
        return this.run(name, params)
      }
    }
    return this
  }

  private run(apiName: string, params: WebviewP) {
    // TODO 注册callback
    // TODO 调用native注册的对象api
    const callback = params && parmas.callback

    if (typeof callback === 'function') {
      const callbackName = this.getUid(callback.name)
      window[callbackName] = this.convertToReceviceBase64(callback) // TODO base64的转换

      parmas.trigger = callbackName
    }
    let messgeHandler = window['btryaWebvie'] as any
    if (!messgeHandler[apiName]) return false

    const encodeParams = (new Buffer(JSON.stringify(params))).toString('base64')

    messgeHandler[apiName](encodeParams)
    return this
  }

  private base64ToString(base64String: string): string {
    base64String = String(base64String).replace(/[-_]/g, function(m0) {
      return m0 === '-' ? '+' : '/'
    })

    return (new Buffer(base64String, 'base64')).toString()
  }

  private convertToReceviceBase64(callback: Function) {
    return (base64String) => {
      let data = {}
      if (base64String) {
        try {
          data = JSON.parse(this.base64ToString(base64String))
        } catch(e) {
          const msg = e.message || 'Webview Parse Base64Data Error'
          data = { msg }
        }
      }
      callback.apply(null, data)
    } 
  }

  private getUid(name) {
    return (name || 'fn') + UID_PREFIX + (++uid)
  }
}

export default Webview

const webview = new Webview()
webvie.exec('setLeftButton', () => {

})
```

### H5 在 app 内的运行方式

1. app的webview直接加载一个webview链接

非常的灵活和方便

拥有和浏览器一样的体验，加载速度受网络影响

2. app内置H5资源

优点：
* 首屏加载速度非常快，用户体验接近原生
* 可以不依赖网络，离线运行

缺点：
* 发版周期会受app的制约
* app的体积会增大
* 需要多方合作

app内的H5资源 需要随着H5的代码更新而更新

完成开发后，H5代码推送到管理平台进行构建和打包，然后管理平台通过事先设计好的长连接通道将H5新版本信息推送给客户端，客户端收到更新指令后，开始下载新包，对包进行完整性校验，merge本地对应的包，更新结束。

### 开发中的常见问题

1. iOS webview 滑动不流畅

`-webkie-overflow-scrolling: touch;`

2. 刘海屏的安全区域的留白

meta viewport viewport-fit cover

```css
.bottom {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-botton: env(safe-area-inset-bottom)
}
```

3. 滚动穿透

主要出现在弹窗出现的时候

3.1 弹窗内无滚动，背景页面有滚动

```js
document.body.addEvnetListener('touchmove', e => {
  e.preventDefault()
})
```

vue: @touchmove.prevent

3.2 弹窗内有滚动，背景页面也有滚动

```js
const inserted = () => {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  document.body.style.cssText += `position: fixed; width: 100%; top: -${scrollTop}px;`
}

const unbind = () => {
  document.body.position = ''
  const top = document.body.style.top
  document.body.scrollTop = -parseInf(top, 10)
  document.body.style.top = ''
}
```