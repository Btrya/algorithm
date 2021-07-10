// 宏微任务题
let promise = new Promise((resolve, reject) => {
  console.log(2)  // 同步2

  queueMicrotask(() => { // 微任务a
    console.log(3) // 同步a1
    setTimeout(() => { // 微任务中的宏任务aa
      console.log(4)
    }, 0)
    console.log(5) // 同步a2
    resolve()
  })

  setTimeout(() => { // 宏任务b
    console.log(6)
  }, 0)

  console.log(7) // 同步7
})
console.log(8) // 同步8
promise.then(res => { // 微任务c
  console.log(9)
})

// 27835964

// async function foo() {
//   console.log(1)
//   let a = await 100
//   console.log(a)
//   console.log(2)
// }
// console.log(0)
// foo()
// console.log(3)

// 0 1 3 100 2