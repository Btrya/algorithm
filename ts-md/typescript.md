# 基础理论

基础类型：number string boolean array object

```ts
const a: number = 0
```

1. enum 枚举

```ts
/** 活动状态枚举 */
export enum ActivityStatus {
  /** 未开始 */
  NOT_START = 'notStart',  // 如果不声明就是0
  /** 已开始 */
  STARTED = 'started'  // 如果不声明就是1
} 

const status = ActivityStatus.NOT_START
```

2. type, interface 声明类型
```ts
type UserInfo = {
  name: string;
  height: number;
}

interface UserInfo {
  name: string; // 这样写是必选项，加个问号变成可选项 name?: string
  height: number;
}

const userInfo: UserInfo = { name: 123, height: 123 }
```

3. 联合类型 |   （联合类型一次只能使用一种类型，而交叉类型每次都是多个类型的合并类型）
4. 交叉类型 &   （联合类型一次只能使用一种类型，而交叉类型每次都是多个类型的合并类型）

```ts
interface UserInfoA = {
  name?: string;
  height?: number;
}

interface UserInfoB = {
  width: number
}

function test(param: UserInfoA & UserInfoB) {

}
```

5. typeof 

```ts
typeof 'a' // string
```

```ts
function toArray(x: number): Array<number> {
  return [x]
}

type Func = typeof toArray; // (x: number) => number[]
```

6. keyof

```ts
// 可以用来获取一个对象中的所有key值


interface Person {
  name: string;
  age: number;
}

type KPerson = keyof Person; // 'name' | 'age'

const str: KPerson = 'name'
const str: KPerson = 'age'
```

7. in 

用来遍历枚举类型

```ts
type Keys = "a" | "b" | "c"

type Obj = {
  [key in Keys]: any; // 约束对象中的key为Keys中的某一个
}
```

8. extends

继承,类型

```ts
interface ILength {
  length: number;
}

function loggingIdentity<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity(3) // 报错，数字没有length，如果传‘3’是不会报错的
loggingIdentity({ length: 10, value: 3 })

```

9. Partial

Partial<T> 的作用是将某个类型的属性全部变为可选项

```ts
interface PageInfo {
  title: string
}

type OptionalPageInfo = Partial<PageInfo>
/**
 * interface PageInfo {
 *  title?: string
 * }
 */

```

10. Required 将某个类型属性变成必填项
11. Readonly

```ts
interface PageInfo {
  title: string
}

type ReadonlyPageInfo = Readonly<PageInfo>

const pageInfo: ReadonlyPageInfo = { title: '' }

pageInfo.title = '11111' // 报错，这时候title是只读属性
```

12. Record 

Record<K extends keyof any, T> 的作用是将K的所有属性的值，转化为T类型

```ts
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: "xxx" },
  contact: { title: "xxxx" },
  home: { title: "xxx" }
}
```

13. Exclude

Exclude<T, U>将某个类型中属于另一个的类型移除掉

```ts
typeof TO = Exclude<"a" | "b" | "c", "a">  // "b" | "c"
typeof T1 = Exclude<"a" | "b" | "c", "a" | "b"> // "c"
```

14. Extract

Extract<T, U>的作用是从T中提取U，大概就是取 T 和 U 的交集的意思

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f"> // "a"
type T1 = Extract<string | number | (() => void), Function> // () => void
```


## 返回res类型定义

```ts
interface UserInfo {
  name: string
}

Axios.get<UserInfo>('./info').then(res => {})
```
## 面试题及实战

1. 你觉得使用ts的好处是什么？
- ts 是 js 的加强版，给 js 添加了可选的静态类型和基于类的面向对象编程，拓展了 js 的语法。 ts 的功能比 js 只多不少
- ts 面向对象的编程语言，包含类和接口的概念
- ts 在开发阶段就能给出编译错误，而 js 错误则需要在运行时才能暴露
- 是一种强类型语言，你可以明确的知道各种数据类型，代码可读性极强，几乎每个人都能很快理解
- ts 中有很多很方便的特性，可选链 // optional chain

```ts
const obj = response
if (obj && obj.aa && obj.aa.bb) {
  const value = obj.aa.bb
}

// 可选链写法
if (obj?.aa?.bb) {
  const value = obj.aa.bb
}
```

2. type 和 interface 的异同?

用 interface 来描述数据结构，用 type 来描述类型

- 都支持描述一个对象或者函数

```ts
interface User {
  name: string;
  age: string;
}

type User = { // 注意 = 号
  name: string;
  age: string;
}
```

- 都允许扩展 extends

interface 和 type 都允许 extends，interface 是可以 extends type的，type 也可以 extends interface

```ts
type Name = {
  name: string
}

interface User extends Name {

}
```

- 只有 type 才能做的事情？

type 可以声明基本类型别名，联合类型，元组等类型

```ts
type Name = string
interface Dog {
  wong()
}
interface Cat {
  miao()
}

type Pet = Dog | Cat

type PetList = [Dog, Cat] // 元组， 元祖就是定义数组里面元素的类型
```

3. 如何基于一个已有类型，扩展出一个大部分内容相似，但是部分区别的类型？
 
Pick 从一个类型中选择一个东西
Omit 从一个类型中排除一个东西

```ts
interface Test {
  name: string;
  sex: number;
  height: string;
}

type Sex = Pick<Test, 'sex'>; // number

const a: Sex = { sex: 1 }

type WithoutSex = Omit<Test, 'sex'> 

const b: WithoutSex = { name: '111', height: '123dasd' }
```

通过泛型

4. 什么是泛型？泛型的具体使用？

泛型是指在定义函数、接口或者类的时候，不预先执行具体的类型，使用的时候再去指定类型的一种特性

```ts
interface Test<T = any> {
  userId: T
}

type TestA = Test<string>

// { userId: string }

type TestA = Test<number>

// { userId: number }
```

5. 用装饰器实现一个计算函数运行时间的逻辑

6. 实现一个路由跳转，通过ts约束参数的 routerHelper

7. 实现一个基于 ts 和事件模式的 countdown 基础类

8. eventemitter3是同步的还是异步的？

同步的。 eventbus  class { emit on once remove }
on
emit