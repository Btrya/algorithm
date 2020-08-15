/**
 * 2020/08/15 每日一题 leetcode 546.移除盒子
 * 给出一些不同颜色的盒子，盒子的颜色由数字表示，即不同的数字表示不同的颜色。
 * 你将经过若干轮操作去去掉盒子，直到所有的盒子都去掉为止。每一轮你可以移除具有相同颜色的连续 k 个盒子（k >= 1），这样一轮之后你将得到 k*k 个积分。
 * 当你将所有盒子都去掉之后，求你能获得的最大积分和。 
 * 示例：
 * 输入：boxes = [1,3,2,2,2,3,4,3,1]
 * 输出：23
 * 解释：
 * [1, 3, 2, 2, 2, 3, 4, 3, 1] 
 * ----> [1, 3, 3, 4, 3, 1] (3*3=9 分) 
 * ----> [1, 3, 3, 3, 1] (1*1=1 分) 
 * ----> [1, 1] (3*3=9 分) 
 * ----> [] (2*2=4 分)
 */
/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
  const n = boxes.length;   
  // js创建三维数组有点麻烦
  const memo = new Array(n);   
  for (let i = 0; i < n; i++) {
    memo[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      memo[i][j] = new Array(n).fill(0);
    }
  }
  // 函数定义：移除区间[l,r]和区间前面和boxes[l]相同的k个数，所能产出的最大积分和
  const getMax = (l, r, k) => {
    if (l > r) return 0;
    if (memo[l][r][k] != 0) return memo[l][r][k];
    // 找出连续的数字，有k+1个
    while (l < r && boxes[l] == boxes[l + 1]) {
      k++;
      l++;
    }
    // 直接把这段连续的移除，收益(k+1)*(k+1)，加上对剩余部分的递归
    let points = (k + 1) * (k + 1) + getMax(l + 1, r, 0)
    // 移除中间部分子数组，让连续数字遇上和自己相同的数字
    for (let i = l + 1; i <= r; i++) {
      if (boxes[l] == boxes[i]) {
        points = Math.max(
          points,
          getMax(l + 1, i - 1, 0) + getMax(i, r, k + 1)
        )
      }
    }
    memo[l][r][k] = points;
    return points;
  };
  return getMax(0, n - 1, 0);
};