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