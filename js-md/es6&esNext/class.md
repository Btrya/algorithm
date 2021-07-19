## class 助力js更加面向对象了 - 类
```js
// 传统对象中 - function函数对象
function Course(teacher, course) {
  this.teacher = teacher
  this.course = course
}
Course.prototype.getCourse = function() {
  return `teacher: ${this.teacher}, course: ${this.course}`
}

const course = new Course('arg1', 'arg2')

// es6
class Course {
  constructor(teacher, course) {
    this.teacher = teacher
    this.course = course
  }
  getCourse() {
    return `teacher: ${this.teacher}, course: ${this.course}:`
  }
}
const course = new Course('teacher', 'course')
```

## 属性定义 两种定义属性的方式: 构造器 & 顶层定义
```js
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
    this.course = course
  }
  getCourse() {
    return `teacher: ${this._teacher}, course: ${this.course}:`
  }
  get teacher() {
    return this._teacher
  }
  set teacher(val) {
    this._teacher = val
  }
}
const course = new Course('teacher', 'course')

// * 意义在哪里？
// 1. 建立只读变量， *js 如何建立只读变量
class Course1 {
  constructor(teacher, course) {
    this._teacher = teacher
    this.course = course
  }
  getCourse() {
    return `teacher: ${this._teacher}, course: ${this.course}:`
  }
  get teacher() {
    return this._teacher
  }
}
const course1 = new Course1('teacher', 'course')
course1.teacher = '123'
console.log(course1.teacher) // teacher
// * 修改只读变量会报错吗？ 无法改变，但不会报错
// 2. *js中如何实现一个私有属性？ 闭包
class Course2 {
  constructor(teacher, course) {
    this._teacher = teacher
    // 在constructor作用域中定义局部变量，内部通过闭包的形式对外暴露该变量
    let _course = 'es6'

    this.getCourse = () => {
      return _course
    }
  }
}
const course2 = new Course2('teacher', 'course')

class Course3 {
  #course = 'es6'
  constructor(teacher, course) {
    this._teacher = teacher
  }
  get course() {
    return `${#course}`
  }
  set course(val) {
    if (val) {
      this.#course = val
    }
  }
}
const course3 = new Course3('teacher', 'course')

// 3.封装核心 - 适配器模式
// 底层封装好通用core服务
class Ultil {
  constructor(core) {
    this._main = core
    this._name = 'myName'
  }
  get name() {
    return ...this._main.name,
    name: `${this._name}`
  }
  set name(val) {
    this._name = val
  }
}
```

### 静态方法 - 直接挂载，无需实例化即可获取
```js
// es5
function Course(teacher, course) {
  this.teacher = teacher
  this.course = course
}
Course.call = function() {
  console.log('calling')
}

// es6
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
  }
  static call() {
    console.log('calling')
  }
}
```

### 继承 - js如何继承
```js
// es5 继承
function Course(teacher, course) {
  this.teacher = teacher
  this.course = course
}
Course.call = function() {
  console.log('calling')
}
Course.prototype.send = function() {
  console.log('sending')
}
// 如何继承
// 子对象
function Child() {
  // 初始化父类
  Course.call(this, 'arg1', 'arg2')
  this.start = function() {
    console.log('starting')
  }
}
Child.prototype = Course.prototype

// es6
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
    this.course = course
  }
  send() {
    console.log('sending')
  }
  static call1() {
    console.log('calling')
  }
}
class Child extends Course {
  constructor() {
    super('arg1', 'arg2')
  }
  start(){
    console.log('starting')
  }
}
```

## 问题
### * class是什么类型？ function
### * class是否有prototype？ 有，{constructor: ƒ, getCourse: ƒ}
### * class可以使用对象方法&属性吗？ 
```js
console.log(Course.hasOwnProperty('teacher')) // true
```
### * class本质是什么？ 本质是一个语法糖