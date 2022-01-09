## vue源码解析

### src目录
- compiler：编译相关
- core：vue核心代码
- platform：跨平台的代码
- server：服务端渲染
- sfs：.vue文件的解析器
- shared：共享工具方法

## 组件化
- 组件渲染 -> createComponent
- 组件配置

## 面试题
1. mvvm的原理或者核心模式(考察观察者模式)?
2. 观察者模式的实现(如何实现响应式)?
3. vue <template> 和 render()区别是什么？为什么更推荐用 render() ？
   <template> 渲染需要多做一次转换，转化成render()
4. vue脚手架新建项目的时候，runtime only of runtime + compiler，在哪个文件里做了区分，到底有什么区别？
5. 为什么vue实例为什么用函数对象而非class？
6. beforeCreate和created之间做了什么？二者有什么区别
   initInjections（初始化注入） -> initState（初始化状态：props、methods、data、computer、watch） -> initProvide
7. props和data是如何把属性挂载在vm上的
   通过proxy这个函数 vm._props.xxx => vm.xxx直接访问
8. vm.$option为什么data是函数，而components是对象？data函数如果没有返回值会报错吗？
9. beforeDestroy和destroyed之间做了什么？二者有什么区别？
10. vue的实例为何不能挂载在body或者html根节点上，如果挂了会报错吗？
   非生产环境会报一个warning: `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
11. beforeMount到mounted之间做了什么？
   new Watcher
12. 什么是虚拟节点？请简述虚拟节点(vdom)。vue和react虚拟dom的区别
13. 对于被监听数据他的__ob__是在什么时候被加上的
   observe的时候