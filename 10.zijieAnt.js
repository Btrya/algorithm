/**
 * @param {number} n
 * @param {number[]} left
 * @param {number[]} right
 * @return {number}
 */
var getLastMoment = function(n, left, right) {
  let time = -1
  for (let i = 0;i < left.length; i++) {
    time = Math.max(time, left[i])
  }
  for (let i = 0;i < right.length; i++) {
    time = Math.max(time, right[i])
  }
  return time
};

console.log(getLastMoment(4, [4, 3], [0, 1]))

console.log(getLastMoment(20, [4, 7, 15], []))