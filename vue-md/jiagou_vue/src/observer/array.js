// 我要重写数组的哪些方法？
// push shift unshift pop reverse sort splice 会导致数组本身发生变化
// slice是不会的

let oladArrayMethods = Array.prototype
// value.__proto__ = arrayMethods 原型链查找 会向上查找，先查找我重写的，重写的没有会继续向上查找
// arrayMethods.__proto__ = oladArrayMethods
export let arrayMethods = Object.create(oladArrayMethods)

let methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'splice',
  'reverse'
]
methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    // AOP 切片编程
    const result = oladArrayMethods[method].apply(this, args) // 调用原生的数组方法
    // push unshift 添加的元素可能还是一个对象
    let inserted  // 当前用户插入的元素
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice': // 3个参数  有 删除 修改的功能 arr.splice(0, 1, {name: 1})
        inserted = args.slice(2)
        break;
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted) // 将新增属性继续观测
    }
    ob.dep.notify() // 如果用户调用了push方法 我会通知当前这个dep去更新
    return result
  }
})