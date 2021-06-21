## Promise A+ 规范

### 术语
1. promise 有 then 方法的对象或者函数
2. thenable 是一个有 then 方法的对象或者是函数
3. value promise状态成功时的值， `resolve(value)` ,这个value的值可以是任意类型： stirng number boolean undefined thenable promise
4. reason promise状态失败时的值， `reject(reason)`
5. exception 使用thorw抛出的异常

### 规范

#### Promise Status
有三种状态，他们之间的流转关系

1. pending
   1.1 初始状态，可改变
   1.2 promise在resolve和reject前都是处于这个状态
   1.3 通过 resolve -> fulfilled 状态
   1.4 通过 reject -> rejected状态
2. fulfilled
   2.1 最终态，不可变
   2.2 一个 promise 被 resolve之后会变成这个状态
   2.3 必须拥有一个value的值
3. rejected
   3.1 最终态，不可变
   3.2 一个 promise 被reject 之后会变成这个状态
   3。3 必须拥有一个reason的值不

总结：         |-> resolve(value) -> fulfilled状态
    pending --
              |-> reject(reason) -> rejected状态

#### then
promise 应该提供一个 then 方法，用来访问最终的结果，无论value 还是reason.

```js
promise.then(onFulfilled, onRejected)
```

1. 参数规范
  1.1 onFulfilled 必须是函数类型，如果传入的不是函数，应该被忽略
  1.2 onRejected 必须是函数类型，如果传入的不是函数，应该被忽略
2. onFulfilled特性
  2.1 在pormise变成fulfilled时，应该调用onFulfilled，参数是value (onFulfilled的执行时机？)
  2.2 在promise变成fulfilled之前，不应该调用 onFulfilled
  2.3 只能被调用一次 （怎么实现只调用一次？）
3. onRejected特性
  3.1 在promise变成 rejected时，调用 onRejected，参数是reason
  3.2 在promise变成 rejected之前，不应该调用 onRejected
  3.3 只能被调用一次
4. onFulfilled 和 onRejected 应该是在微任务阶段执行
  实现promise的时候，如何去生成微任务。
5. then 方法可以被调用多次
  5.1 promise 状态变成 fulfilled后，所有的 onFulfilled 回调都需要按照注册的顺序执行，也可以理解为按照.then的顺序执行
  5.2 promise 状态变成 rejected后，所有的 onRejected 回调都需要按照注册的顺序执行，也可以理解为按照.then的顺序执行
6. 返回值
  then 应该返回一个 promise
  ```js
  const promise2 = promise.then(onFulfilled, onRejected)
  ```
  6.1 onFulfilled 或 onRejected 执行结果为 x，调用 resolvePromise 
  6.2 onFulfilled 或 onRejected 执行过程中抛出了异常e，promise2需要被reject
  6.3 如果 onFulfilled 不是一个函数， promise2 以 pormise1 的 value 触发 fulfilled
  6.4 如果 onRejected 不是一个函数， promise2 以 pormise1 的 reason 触发 rejected
7. resolvePromise

  ```js
    resolvePromise(promise2, x, resolve, reject)
  ```
  7.1 如果promise2和x相等，reject typeError
  7.2 如果x是一个promise
      如果x是pending，promise必须要在pending状态，直到x的状态改变
      如果x是 fulfilled, value -> fulfilled
      如果x是 rejected, value -> rejected
  7.3 如果 x 是一个Object / Function
      去获取 x.then, 如果报错 reject reason
      then 是一个函数， then.call(x, resolvePromiseFn, rejectPromiseFn)

## 实现 Promise

1. `const promise = new Promise();`  代表 Promise 应该是一个构造函数或者 class。
2. 定义三种状态
3. 初始化状态 -> pendin，初始化value和reason为null
4. resolve 和 reject 方法
   4.1 这两个方法要更改 status , 从 pending 变成 fulfilled / rejected
   4.2 入参 分别是 value / reason
5. 对于实例化promise时的入参处理
   5.1 入参是一个函数，接收 resolve reject 两个参数
   5.2 初始化promise的时候，就要同步执行这个函数，并且有任何的报错都要通过reject抛出去
6. then 方法
   6.1 then 接收两个参数： onFulfilled 和 onRejected 
   6.2 检查并处理参数，如果参数不是函数，则忽略
   6.3 根据当前promise的状态，调用不同的函数
   6.4 首先我们要拿到所有的回调，新建两个数组，分别存储成功和失败的回调，调用then的时候，如果还是pending就存入数组
   6.5 在 status 发生变化的时候，执行回调，用到getter setter，监听status的变化。在发生变化的时候来做对应的操作
7. then的返回值
   7.1 如果 onFulfilled 或者 onRejected 抛出一个异常e，那么新的promise必须reject e
   7.2 返回值应该是一个 promise
   7.3 如果 onFulfilled 不是函数，且promise1成功执行，那么promise2必须返回同样的状态和value
   7.4 如果 onRejected 不是函数，且promise1拒绝执行，那么promise2必须返回同样的状态和reason
   7.5 如果 onFulfilled 或者 onRejected 返回一个值 x , 运行 resolvePromise 方法。
8. resolvePromise
9. onFulfilled 和 onRejected 在微任务中运行


### 问题

1. promise的参数，执行时机是什么时候？  
2. status 有哪些？他们的状态流转是怎么样的？
3. 回调，onFulfilled 和 onRejected 的回调，分别的执行时机是什么？
4. 静态方法和实例方法有什么区别？
5. generator 特性是什么？如果遍历一个数组，只调用一次next，会输出所有值吗？
6. async await规范？