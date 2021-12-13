export function createElement(tag, data = {}, ...children) {
  let key = data.key
  if (key) {
    delete data.key
  }
  return vnode(tag, data, key, children, undefined)
}

export function createTextNode(text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}
// 虚拟节点 就是通过 _c _v 实现都用对象来描述dom的操作