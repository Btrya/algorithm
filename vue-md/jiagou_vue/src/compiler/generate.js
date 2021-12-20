const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function genProps(attrs) { // 处理属性 拼接成属性的字符串
  let str = ''
  for (let i = 0; i < attrs.length; ++i) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      // style="color: red;" => {style: {color: 'red'}}
      let obj = {}
      attr.value.split(";").forEach(item => {
        let [key, value] = item.split(":")
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}
function genChildren(el) {
  let children = el.children
  if (children && children.length > 0) {
    return `${children.map(child => {
      return gen(child)
    }).join(',')}`
  } else {
    return false
  }
}
function gen(node) {
  if (node.type == 1) {
    // 元素标签
    return generate(node)
  } else {
    // 文本
    let text = node.text
    let tokens = []
    let match, index
    // 每次的偏移量 buffer.split()
    let lastIndex = defaultTagRE.lastIndex = 0    // 正则的问题 lastIndex的问题 exec每次会叠加 要置0
    while (match = defaultTagRE.exec(text)) {
      index = match.index
      if (index > lastIndex) {       
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    // _v("a" + _s(name) + "b" + _s(age) + "c")
    return `_v(${tokens.join('+')})`
  }
}

export function generate(el) {
  let children = genChildren(el)
  let code = `_c("${el.tag}", ${
    el.attrs.length > 0 ? genProps(el.attrs) : 'undefined'
  }${
    children ? `,${children}` : ''
  })
  `
  return code
}