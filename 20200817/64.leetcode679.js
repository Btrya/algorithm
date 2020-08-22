/**
 * 2020/08/22 每日一题 679.24点游戏
 * 你有 4 张写有 1 到 9 数字的牌。
 * 你需要判断是否能通过 *，/，+，-，(，) 的运算得到 24。
 * 示例 1:
 * 输入: [4, 1, 8, 7]
 * 输出: True
 * 解释: (8-4) * (7-1) = 24
 * 示例 2:
 * 输入: [1, 2, 1, 2]
 * 输出: False
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var judgePoint24 = function (nums) {
  const len = nums.length;
  if (len == 1) {
    // 递归结束，剩下一个数的情况，处理精度问题
    const diff = nums[0] - 24;
    return Math.abs(diff) < 0.00001;
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const copyName = nums.slice(); // 拷贝数组
      copyName.splice(j, 1); // 删除索引大的数字，排除影响索引更小数的位置的情况
      copyName.splice(i, 1);
      let n1 = nums[i];
      let n2 = nums[j];
      let isValid = false;
      isValid = isValid || judgePoint24(copyName.concat(n1 + n2));
      isValid = isValid || judgePoint24(copyName.concat(n1 - n2));
      isValid = isValid || judgePoint24(copyName.concat(n2 - n1));
      isValid = isValid || judgePoint24(copyName.concat(n1 * n2));
      if (n2 !== 0) isValid = isValid || judgePoint24(copyName.concat(n1 / n2));
      if (n1 !== 0) isValid = isValid || judgePoint24(copyName.concat(n2 / n1));
      if (isValid) return true;
    }
  }
  return false;
};
