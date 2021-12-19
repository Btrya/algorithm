let queue = []
let has = {}
import { nextTick } from "../util/next-tick.js"
function flushSchedularQueue() {
  queue.forEach(watcher => watcher.run())
  queue = []
  has = {}
}
export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    queue.push(watcher)
    has[id] = true
    // 宏任务后微任务 (vue 里面使用 Vue.nextTick)
    // Vue.nextTick = promise / mutationObserver / setImmediate / setTimeout
    nextTick(flushSchedularQueue)
  }
}