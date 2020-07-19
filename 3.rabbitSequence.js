/**
 * 斐波那契数列（Fibonacci sequence），又称黄金分割数列、
 * 因数学家莱昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”
 * 指的是这样一个数列：1、1、2、3、5、8、13、21、34、……
 * 即F(1)=1，F(2)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 3，n ∈ N*）
 * 用人话描述就是 这个数列从第3项开始，每一项都等于前两项之和。
 */

 /**
  * 基础斐波那契数列实现
  * @description 传入n值返回斐波那契数列
  * @param {number} n
  * @return {Array} 
  */
 function myRabbitSequence(n) {
  let num1 = 1,
      num2 = 1,
      sum
  let arr = [1, 1]
  for (let i = 3; i <= n; i ++) {
    sum = num1 + num2
    num1 = num2
    num2 = sum
    arr.push(sum)
  }
  return arr
 }

 console.log(myRabbitSequence(9))

 /**
  * 拓展： 传入n返回斐波那契数列对应下标的值
  * @param {number} n
  * @return {number} 
  */
 // 迭代递归式
function myRabbitSequenceExtend(n, v1 = 1, v2 = 1) {
  if (n == 1) return v1
  if (n == 2) return v2
  return myRabbitSequenceExtend(n - 1, v2, v1 + v2)
}
// 普通迭代
var fib = function(N) {
  if (N < 2) return N
  return fib(N - 1) + fib(N - 2) 
};

// 缓存+迭代
var fib = function(N) {
  let map = new Map()
  const generate = function (N) {
      if (N < 2) return N
      if (map.has(N)) {
          return map.get(N)
      }
      let res = generate(N - 1) + generate(N - 2)
      map.set(N, res)
      return res
  }
  return generate(N)
};
console.log(myRabbitSequenceExtend(9))
