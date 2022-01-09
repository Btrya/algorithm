// Vue 的核心代码 只是Vue的一个声明
import { initMixin } from './init' 
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle';
import { initGlobalAPI } from './initGlobalAPI/index.js'

function Vue(options) {
  // 进行Vue的初始化操作
  this._init(options)
}

// 通过引入文件的方式 给Vue原型上添加方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)


// 初始化全局的api
initGlobalAPI(Vue)

// demo 产生两个虚拟节点进行比对

// template => render 方法 => vnode
import { compileToFunction } from './compiler/index.js'
import { createElm, patch } from './vdom/patch.js'
let vm1 = new Vue({
  data: { name: 'hello' }
})

let render1 = compileToFunction(`<div id="app">
  <div style="background: red;" key="A">A</div>
  <div style="background: orange;" key="B">B</div>
  <div style="background: yellow;" key="C">C</div>
</div>`)
let vnode1 = render1.call(vm1)
let el1 = createElm(vnode1)
document.body.appendChild(el1)

let vm2 = new Vue({
  data: { name: 'Btrya', age: 18 }
})
let render2 = compileToFunction(`<div id="aaa">
  <div style="background: pink;" key="Q">Q</div>
  <div style="background: red;" key="A">A</div>
  <div style="background: gray;" key="F">F</div>
  <div style="background: yellow;" key="C">C</div>
  <div style="background: blue;" key="N">N</div>
</div>`)
let newVnode = render2.call(vm2)
setTimeout(() => {
  patch(vnode1, newVnode) // 传入两个虚拟节点 会在内部进行比对
}, 2000);


// 1. diff 算法的特点是  平级比对  我们正常操作dom元素  很少涉及到父变成子 子变成父 O(n^3)


export default Vue