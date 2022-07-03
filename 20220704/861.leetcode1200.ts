/**
 * 2022/07/04 每日一题 1200. 最小绝对差
 * 给你个整数数组 arr，其中每个元素都 不相同。
 * 
 * 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。
 *
 * 
 * 示例 1：
 * 
 * 输入：arr = [4,2,1,3]
 * 输出：[[1,2],[2,3],[3,4]]
 * 示例 2：
 * 
 * 输入：arr = [1,3,6,10,15]
 * 输出：[[1,3]]
 * 示例 3：
 * 
 * 输入：arr = [3,8,-10,23,19,-4,-14,27]
 * 输出：[[-14,-10],[19,23],[23,27]]
 *  
 * 
 * 提示：
 * 
 * 2 <= arr.length <= 10^5
 * -10^6 <= arr[i] <= 10^6
 */
 function minimumAbsDifference(arr: number[]): number[][] {
  arr.sort((a, b) => a - b)
  let minDiff = Number.MAX_SAFE_INTEGER
  const ans = []
  for (let i = 1; i < arr.length; ++i) {
      const diff = Math.abs(arr[i] - arr[i - 1])
      if (minDiff < diff) {
          continue
      } else if (minDiff > diff) {
          minDiff = diff
          ans.length = 0
      }
      ans.push([arr[i - 1], arr[i]])
  }
  return ans
};