## arrow_function 箭头函数
```js
// es5
// 传统函数
function sum(a, b) {
  return a + b
}

// 传统函数表达式
const sum1 = function(a, b) {
  return a + b
}
sum(1, 1)
sum1(1, 1)

// es6
const sum2 = (a, b) => {
  return a + b
}
const sum3 = (a, b) => a + b
const sum4 = x => {
  // 逻辑
}
```

### 上下文 - this
```js
const obj = {
  teacher: 'teacher',
  leader: 'leader',
  arg: ['arg1', 'arg2'],
  getTeacher: function() {
    return this.teacher
  },
  getLeader:() => {
    return this.leader
  }
}
obj.getTeacher()
obj.getLeader()
```
#### * 为什么箭头函数无法get到属性 => this? 箭头函数拿到的是上一层的this 这里是window

### 箭头函数上下文场景
#### 1. dom操作cb
```js
// <button id="btn"></button>
const btn = document.getElementById('btn')
btn.addEventListener('click', function() { // dom操作的时候用箭头函数this容易有问题，所以用function
  this.style.width = '100%'
})
```
#### 2. 类操作
```js
// 箭头函数无法构造类
function Obj1(teacher, leader) {
  this.teacher = teacher
  this.leader = leader
}
const Obj2 = (teacher, leader) => { // 不可以
  this.teacher = teacher
  this.leader = leader
}

const o1 = new Obj1('teacher', 'leader')
const o2 = new Obj2('teacher', 'leader') // 报错

// * 箭头函数可否构造原型方法？ 箭头函数无法构造原型上的方法
Obj1.prototype.course = function() {
  console.log(`${this.teacher}&${this.leader}`)
}
Obj2.prototype.course = () => { // 不可以，会报错
  console.log(`${this.teacher}&${this.leader}`)
}
```

#### 3.箭头函数的参数
```js
// 箭头函数是没有arguments的
const sum = function(a, b) {
  console.log(arguments)
}

const sum1 = (a, b) => { // 报错
  console.log(arguments)
}

const sum1 = (...arg) => { // 这么写可以拿到
  console.log(arg)
}
```