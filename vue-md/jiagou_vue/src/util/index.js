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