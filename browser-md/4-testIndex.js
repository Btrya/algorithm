const parent = document.getElementById('parent')
const child = document.getElementById('child')
const son = document.getElementById('son')
const baidu = document.getElementById('a-baidu')

baidu.addEventListener('click', function(e) {
  e.preventDefault()
})

const banned = false

// e.target.nodeName 指的是当前点击的元素， e.currentTarget.nodeName 指的是绑定事件监听的元素
window.addEventListener('click', function(e) {
  if (banned) {
    e.stopPropagation()
    alert('你被封禁了')
    return
  }

  console.log(`window 捕获`, e.target.nodeName, e.currentTarget.nodeName)
}, true) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

parent.addEventListener('click', function(e) {
  // e.stopPropagation()
  console.log(`parent 捕获`, e.target.nodeName, e.currentTarget.nodeName)
}, true) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

child.addEventListener('click', function(e) {
  console.log(`child 捕获`, e.target.nodeName, e.currentTarget.nodeName)
}, true) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

son.addEventListener('click', function(e) {
  console.log(`son 捕获`, e.target.nodeName, e.currentTarget.nodeName)
}, true) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

son.addEventListener('click', function(e) {
  // e.stopPropagation()
  console.log(`son 冒泡`, e.target.nodeName, e.currentTarget.nodeName)
}, false) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

child.addEventListener('click', function(e) {
  console.log(`child 冒泡`, e.target.nodeName, e.currentTarget.nodeName)
}, false) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

parent.addEventListener('click', function(e) {
  console.log(`parent 冒泡`, e.target.nodeName, e.currentTarget.nodeName)
}, false) // 第三参数传true才是捕获事件，不传默认false是冒泡事件

window.addEventListener('click', function(e) {
  console.log(`window 冒泡`, e.target.nodeName, e.currentTarget.nodeName)
}, false) // 第三参数传true才是捕获事件，不传默认false是冒泡事件