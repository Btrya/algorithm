/**
 * 整数n为偶数时砍一半，奇数则(3n+1)后砍掉一半，求n=1的时候所需步骤
 * @param {number} n
 * @return {number} n=1时所需要步骤数
 */
// const myFun = (n)=> {
//   let res = 0
//   while(n != 1) {
//     n = n % 2 === 0 ? n /= 2 : (3 * n + 1) / 2
//     res ++
//   }
//   return res
// }

// console.log(myFun(5))

/**
 * 整数n为偶数时砍一半，奇数则(3n+1)后砍掉一半，求n=1的时候所需步骤,递归实现
 * @param {number} n
 * @return {number} n=1时所需要步骤数
 */

// const myFun = (n, res = 0) => {
//   if (n != 1) {
//     res ++
//     n = n % 2 === 0 ? n /= 2: myFun((3 * n + 1) / 2, res)
//   } else {
//     return res
//   }
//   return n
// }

const myFun = (n) => {
  let count = 0
  if (n == 1) {
    return count
  }
  count++
  return count + (n % 2 == 0 ? myFun(n / 2) : myFun((3 * n + 1) / 2))
}

console.log(myFun(4))