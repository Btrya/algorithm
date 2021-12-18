let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  depend() {
    // 让这个watcher 记住我当前的dep
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
  addSub(watcher) {
    this.subs.push(watcher) // 观察者模式
  }
}
let stack = []
// 目前可以做到 将watcher保留起来和移除
export function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}

export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}

export default Dep