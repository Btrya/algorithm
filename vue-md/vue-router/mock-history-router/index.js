class BaseRouter {
  constructor() {
    this.routes = {}
    this.bindPopState = this.popState.bind(this)
    this.bindPopState()
    this.init(location.pathname)
  }

  init(path) {
    window.history.replaceState({
      path
    }, null, path)
    const cb = this.routes[path]
    cb && cb()
  }

  go(path) {
    window.history.pushState({
      path
    }, null, path)
    const cb = this.routes[path]
    cb && cb()
  }

  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  popState() {
    window.addEventListener('popstate', (e) => {
      const path = e.state && e.state.path
      console.log(`in popstate listener path = ${path}`)
      const cb = this.routes[path]
      cb && cb()
    })
  }
}

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