/**
 * 2021/10/28 每日二题 506. 相对名次
 * 给出 N 名运动员的成绩，找出他们的相对名次并授予前三名对应的奖牌。前三名运动员将会被分别授予 “金牌”，“银牌” 和“ 铜牌”（"Gold Medal", "Silver Medal", "Bronze Medal"）。
 * 
 * (注：分数越高的选手，排名越靠前。)
 * 
 * 示例 1:
 * 
 * 输入: [5, 4, 3, 2, 1]
 * 输出: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
 * 解释: 前三名运动员的成绩为前三高的，因此将会分别被授予 “金牌”，“银牌”和“铜牌” ("Gold Medal", "Silver Medal" and "Bronze Medal").
 * 余下的两名运动员，我们只需要通过他们的成绩计算将其相对名次即可。
 * 提示:
 * 
 * N 是一个正整数并且不会超过 10000。
 * 所有运动员的成绩都不相同。
 */
/**
 * map + 希尔排序
 * @param {number[]} score
 * @return {string[]}
 */
 var findRelativeRanks = function(score) {
  let arr = JSON.parse(JSON.stringify(score))
  shellSort(arr)
  let goldMap = {}
  arr.map((key, index) => {
    if(index === 0){
      goldMap[key] = "Gold Medal";
    }
    if(index == 1){
      goldMap[key] = "Silver Medal";
    }
    if(index == 2){
      goldMap[key] = "Bronze Medal";
    }
    if (index > 2){
      goldMap[key] = index + 1;
    }
  });
  const resArr = nums.map(key => {
    return (
      goldMap[key] + ""
    )
  });
  return resArr
};
function shellSort(arr) {
  const n = arr.length
  // 增量序列
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 从 gap 开始，按照顺序将每个元素依次向前插入自己所在的组
    for (let i = gap; i < n; ++i) {
      // currentNumber 站起来 找位置
      let currentNumber = arr[i]
      // 该组前一个数组的索引
      let preIdx = i - gap
      while (preIdx >= 0 && currentNumber > arr[preIdx]) {
        // 向后挪位置
        arr[preIdx + gap] = arr[preIdx]
        preIdx -= gap
      }
      // currentNumber 找到了自己的位置 坐下
      arr[preIdx + gap] = currentNumber
    }
  }
}