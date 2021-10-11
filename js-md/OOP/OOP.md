## 对象是什么？为什么要面向对象？

### 特点：面向对象(OOP)：逻辑迁移灵活、代码可复用性高、高度模块化

***

### 对象的理解
* 对象是对于单个物体的简单抽象
* 对象是一个容器，封装了该单个物体的属性和方法
* * 属性： 对象的状态
* * 方法： 对象的行为
```js
// 简单对象
const Course = {
  teacher: 'Asaki',
  leader: 'Btrya',
  startCourse: function(name) {
    return `开始${name}课`
  }
}

// 函数对象
function Course() {
  this.teacher = 'Asaki'
  this.leader = 'Btrya'
  this.startCourse = function(name) {
    return `开始${name}课`
  }
}
```

***

### 构造函数 - 生成对象

- 需要一个模板 - 表征了一类物体的共同特征，从而生成对象
- 类即对象模板

- js其实本质上不是基于类，而是基于构造函数 + 原型链
- constructor + prototype

```js
// Course的本质就是构造函数
function Course() {
  this.teacher = 'Asaki'
  this.leader = 'Btrya'
}

const course = new Course()
```
1. 函数体内是用的this，代表所要生成的实例
2. 生成对象通过new来实例化
3. 可以做初始化传参

#### 问题：
1. 构造函数，不初始化，可以使用吗？
无法使用
2. 如果需要使用，如何做兼容
```js
function Course() {
  const _isClass = this instanceof Course
  if (!_isClass) {
    return new Course()
  }
  this.teacher = 'Asaki'
  this.leader = 'Btrya'
}

const course = Course()
```
3. new是什么？new的原理？new做了什么？
```js
function Course() {}
const course = new Course()
```
* 1. 创建了一个空对象，作为返回的对象实例
* 2. 将生成空对象的原型对象指向了构造函数的prototype属性
* 3. 将当前实例对象赋给了内部this
* 4. 执行构造函数初始化代码

4. 实例属性影响
```js
function Course(teacher, leader) {
  this.teacher = teacher
  this.leader = leader
}

const course1 = new Course('Asaki', 'Brtay')
const course2 = new Course('Diamon', 'Centre')

// course2 属性和 course1 是隔离的
course2.leader = 'Eric'
```

5. constructor是什么？
```js
function Course(teacher, leader) {
  this.teacher = teacher
  this.leader = leader
}

const course = new Course('Asaki', 'Brtay')
```
* 1. 每个对象在创建时会自动拥有一个构造函数属性constructor
* 2. constructor继承自原型对象
* 3. constructor指向构造函数的引用

6. 使用构造函数创建对象会有什么性能问题？
```js
function Course(name) {
  this.teacher = 'Asaki'
  this.leader = 'Btrya'
  this.startCourse = function(name) {
    return `开始${name}课`
  }
}

const course1 = new Course('es5')
const course2 = new Course('es6')
// 构造函数中的方法，会存在与每个生成的实例中，重复挂载会导致资源浪费
```

***

### 原型对象
```js
function Course() {}
const course1 = new Course()
const course2 = new Course()
```
1. 构造函数：用来初始化创建对象的函数 - Course
* 自动给构造函数赋予一个属性prototype，该属性实际等于实例对象的原型对象
  
2. 实例对象： course1 就是实例对象，根据原型创建出来的实例
* 每个对象都有个\_\_proto__
* 每个实例对象都有个coustructor属性
* constructor 由继承而来，并指向当前构造函数

3. 原型对象:Course.prototype
```js
function Course() {}
Course.prototype.teacher = 'Asaki'
const course1 = new Course()
const course2 = new Course()

// 解决 重复挂载会导致资源浪费 问题
function Course(name) {
  this.teacher = 'Asaki'
  this.leader = 'Btrya'
  this.name = name
  // this.startCourse = function(name) {
  //   return `开始${name}课`
  // }
}
Course.prototype.startCourse = function() {
  return `开始${this.name}课`
}

const course1 = new Course('es5')
const course2 = new Course('es6')
```

## 重点 敲黑板了
```js
course1.__proto__ === Course.prototype
Course.prototype.constructor === Course
Course.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

Course.constructor === Object.constructor = Function
Function.prototype.__proto__ === Object.prototype

Object.constructor.prototype.__proto__ === Object.prototype
```

*** 

## 继承
#### 在原型对象的所有属性和方法，都能被实例所共享
```js
// Game类
function Game() {
  this.name = 'lol'
}
Game.prototype.getName = function() {
  return this.name
}

// LOL类
function LOL() {}
// LOL 继承 Game
LOL.prototype = new Game()
LOL.prototype.constructor = LOL
const game = new LOL()
// 本质：重写原型对象，将父对象的属性方法，作为子对象原型对象的属性和方法
```

#### 原型链继承有什么缺点
prototype上的属性方法是共享的
不能传参
```js
// Game类
function Game() {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function() {
  return this.name
}

// LOL类
function LOL() {}
// LOL 继承 Game
LOL.prototype = new Game()
LOL.prototype.constructor = LOL
const game1 = new LOL()
const game2 = new LOL()
game1.skin.push('ss')
```
* 1. 父类属性一旦赋值给子类的原型属性，此时属性属于子类的共享属性了
* 2. 实例化子类时，不能向父类传参

### 解决方案： 构造函数继承 / 经典继承
原理： 在子类构造函数内部调用父类构造函数
```js
// Game类
function Game() {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function() {
  return this.name
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
}
// LOL 继承 Game
const game3 = new LOL()

// 解决了 共享属性问题 & 传参问题
```

### 追问： 原型链上的共享方法无法被读取继承，如何解决？

#### 组合继承
```js
// Game类
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function() {
  return this.name
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
}
// LOL 继承 Game
LOL.prototype = new Game()
LOL.prototype.constructor = LOL
const game4 = new LOL()
```

#### 追问： 组合继承有什么缺点？
无论何种场景，对象都会调用两次父类构造函数
* 1. 初始化子类型时一次
* 2. 子类构造函数内部call父类一次

### 解决方案：寄生组合继承 （最终解决方案）
```js
// Game类
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function() {
  return this.name
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
}
// LOL 继承 Game
LOL.prototype = Object.create(Game.prototype)
LOL.prototype.constructor = LOL
const game5 = new LOL()
```

#### 提高题： 如何在js里实现多重继承？
```js
// Game类
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function() {
  return this.name
}
// Store类
function Store() {
  this.shop = 'steam'
}
Store.prototype.getPlatform = function() {
  return this.shop
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
  Store.call(this, arg)
}
// LOL 继承 Game、Store
LOL.prototype = Object.create(Game.prototype)
Object.assign(LOL.prototype, Store.prototype)
LOL.prototype.constructor = LOL
const game5 = new LOL()
```