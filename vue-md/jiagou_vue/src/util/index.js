/**
 * @param {*} data 当前数据是不是对象
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null
}

/**
 * 
 * @param {*} data 对该值设置属性
 * @param {*} key  设置的属性名
 * @param {*} value  设置的值
 */
export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false, // 不可枚举
    configurable: false, // 不可被配置
    value
  })
}
/**
 * 取值代理
 * @param {*} vm 实例
 * @param {*} source 取值位置
 * @param {*} key 键
 */
export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

let strats = {

}
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal) // res.__proto__ = parentVal
  if (childVal) {
    for (let key in childVal) {
      res[key] = childVal[key]
    }
  }
  return res
}
strats.components = mergeAssets
export function mergeOptions(parent, child) {
  const options = {}
  for (let key in parent) {
    mergeField(key)
  }
  for (let key in child) {
    // 如果已经合并过了 就不需要再次合并了
    if (!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  // 默认合并策略 但是有些属性需要有特殊的合并方式 比如生命周期/data
  function mergeField(key) {
    if (strats[key]) {
      return options[key] = strats[key](parent[key], child[key])
    }
    if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    } else if (child[key] == null) {
      options[key] = parent[key]
    } else {
      options[key] = child[key]
    }
  }
  return options
}

export function isReservedTag(tagName) {
  let str = 'p,div,span,input,button'
  let obj = {}
  str.split(',').forEach(tag => {
    obj[tag] = true
  })
  return obj[tagName]
}