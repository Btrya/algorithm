/**
 * 解决兼容性 addEventListener attachEvent
 * 实现一个兼容性好监听
 */

class BomEvent {
  constructor(element) {
    this.element = element
  }

  addEvent(type, handler) {
    if (this.element.addEventListener) {
      this.element.addEventListener(type, handler, false)
    } else if (this.element.attachEvent) {
      this.element.attachEvent(`on${type}`, function() { // 这里都用到attachEvent了所有大概率就不能用箭头函数了
        handler.call(element)
      })
    } else {
      this.element[`on${type}`] = handler
    }
  }

  removeEvent(type, handler) {
    if (this.element.removeEventListener) {
      this.element.removeEventListener(type, handler, false)
    } else if (this.element.detachEvent) {
      this.element.detachEvent(`on${type}`, function() { // 这里都用到attachEvent了所有大概率就不能用箭头函数了
        handler.call(element)
      })
    } else {
      this.element[`on${type}`] = null
    }
  }
}

function stopPropagation(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation() // 标准 W3C
  } else {
    ev.cancelBubble = true // IE
  }
}

function preventDefault(ev) {
  if (ev.preventDefault) {
    ev.preventDefault() // 标准 W3C
  } else {
    ev.returnValue = false // IE
  }
}