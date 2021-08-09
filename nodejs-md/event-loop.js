async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
  // new Promise((resolve, reject) => {
  //   console.log(async2)
  //   resolve()
  // }).then((res) => {
  //   console.log('async1 end')
  // })
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout0')
  setTimeout(function () {
      console.log('setTimeout1');
  }, 0);
  setImmediate(() => console.log('setImmediate'));
}, 0)

async1();
process.nextTick(() => console.log('nextTick'));
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})
console.log('script end')

// script start
// async1 start
// async 2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setTimeout0
// setImmediate
// setTimeout1