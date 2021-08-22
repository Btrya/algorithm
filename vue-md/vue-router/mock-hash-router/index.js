class BaseRouter {
  constructor() {
    this.routes = {} // 存储path以及callback的对应关系
    this.refresh = this.refresh.bind(this) // 这里为什么要bind？不bind会怎么样
    window.addEventListener('load', this.refresh)
    window.addEventListener('hashchange', this.refresh)
  }

  route(path, callback) {
    this.routes[path] = callback || function() {} // 为什么refresh函数里有 cb && cb() 这里还需要 || function() {} 
  }

  refresh() {
    const path = `/${location.hash.slice(1) || ''}`
    const cb = this.routes[path]
    cb && cb()
  }
}

// 1. 数据存储，数据结构的选用？ 对象/Map
// 2. refresh bind
// 3. 页面首次加载的路由渲染怎么处理？
// 4. 页面路由的改变监听

const body = document.querySelector('body')

function changeBgColor(color) {
  body.style.backgroundColor = color
}

const Router = new BaseRouter()

Router.route('/', function() {
  changeBgColor('white')
})

Router.route('/green', function() {
  changeBgColor('green')
})

Router.route('/gray', function() {
  changeBgColor('gray')
})