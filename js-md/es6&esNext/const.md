## const 标识常量
```js
const AREA = 10;
const OBJ_Map = {
  a: 'A',
  A: 'a'
}
const PIPE_LINE = [1, 2, 3, 5, 4]
```

### 1. 不允许重复生命
```js
var arg1 = 'arg1'
arg1 = 'change'

console.log(agr1) // change

// *es5怎么定义一个常量?
Object.defineProperty(window, 'arg2', {
  value: 'arg2',
  writable: false
})
arg2 = 'change' // *会不会报错？能不能修改？ 不会报错，能修改
console.log(arg2) // arg2

// ES6
const arg3 = 'arg3'
arg3 = 'change' // *会不会报错？能不能修改？ 会报错，不能修改

// *const 可以分开声明赋值吗？ 不可以，会报错
const arg4
arg4 = 'arg4'

// *es5可以重复声明吗？ 可以，且值直接覆盖
var arg5 = 'arg5'
var arg5 = 'change'

// *const可以重复声明吗？ 不能，会报错
const arg6 = 'arg6'
const arg6 = 'change'
```

### 2.块级作用域
```js
const PERMIT = 'true'

if (PERMIT) {
  var arg1 = 'arg1'
}
console.log(arg1) // arg1

// const
const PERMIT = 'true'

if (PERMIT) {
  const arg2 = 'arg2'
}
console.log(arg2) // arg2 not defind
```

### 3.无变量提升
```js
console.log(arg3) // arg3
var arg3 = 'arg3'

// 无变量提升-先声明再使用
console.log(arg4) // 报错
const arg4 = 'arg4'

var arg5 = 'arg5'
console.log(window.arg5) // arg5
// const 不在 window 中
const arg6 = 'arg6'
console.log(window.arg6) // arg6 not defind
```

### 4.dead zone 暂时性死区
```js
const PERMIT = 'true'

if (PERMIT) {
  // 暂时性死区
  console.log(arg2) // 报错
  const arg2 = 'arg2'
}
console.log(arg2) // arg2 not defind
```

### 5.let
```js

```
#### let 和 const 什么时候用？
* bad - 优先使用let，常量时候再去使用 const
* perfer - 优先使用const

### 面试附加题
```js
// 引用类型的内部属性值无法被常量化
const obj = {
  teacher: 'teacher',
  leader: 'leader'
}
obj.teacher = 'leader'
console.log(obj.teacher) // leader

const arr = ['teacher', 'leader']
arr[0] = 'leader'
console.log(arr[0]) // leader

// * 引用类型如何冻结 原理 - 指向指针
// 破局 - Object.freeze()
Object.freeze(obj) // * 可否被修改？会报错吗？ 不能修改，不会报错

// * 进一步追问 - 复合类型的对象可否freeze？
const obj2 = {
  teacher: 'teacher',
  leader: 'leader',
  arg: ['arg1', 'arg2']
}
obj2.arg[0] = 'arg3'
Object.freeze(obj2) // arg3 freeze无法冻结复合引用类型

// * 如何破局
// freeze如何做deep化？
// 思路：嵌套遍历并且逐层freeze
function deepFreeze(obj = {}) {
  Object.freeze(obj)
  (Object.key(obj) || []).forEach(key => {
    if (typeof obj[key] === 'object') {
      deepFreeze(obj[key])
    }
  })
}
```