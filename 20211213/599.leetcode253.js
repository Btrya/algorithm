/**
 * 2021/12/13 每日第二题 253. 会议室 II
 * 给你一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间 intervals[i] = [starti, endi] ，为避免会议冲突，同时要考虑充分利用会议室资源，请你计算至少需要多少间会议室，才能满足这些会议安排。
 * 示例 1：
 * 
 * 输入：intervals = [[0,30],[5,10],[15,20]]
 * 输出：2
 * 示例 2：
 * 
 * 输入：intervals = [[7,10],[2,4]]
 * 输出：1
 *  
 * 
 * 提示：
 * 
 * 1 <= intervals.length <= 104
 * 0 <= starti < endi <= 106
 */
/** 
 * @param {number[][]} intervals
 * @return {number}
 */
// 方法1
var minMeetingRooms = function (arr) {
  //开始时间从小大排序
  arr.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1]
    }
    return a[0] - b[0]
  })
  //用个队列存储每个会议的结束时间
  let queue = []
  //将第一个开始的会议结束时间存入队列
  queue.push(arr[0][1])
  //遍历所有会议时间
  for (let i = 1; i < arr.length; ++i) {
    //当前队列的栈顶的结束时间 小于或等于 当前会议的开始时间
    const findI = queue.findIndex(item => item <= arr[i][0])
    if (findI !== -1) {
      //最早结束的会议室可用 复用这个会议室
      queue.splice(findI, 1)
    }
    //无法复用 需增加一个会议室
    queue.push(arr[i][1])
  }
  //返回队列中的数目就是需要的会议室总数
  return queue.length
};

// 方法2
var minMeetingRooms = function(arr) {
  // 边界返回
  if (!arr) return 0
  const n = arr.length
  // 创建同等长度数组
  let startTimes = new Array(n).fill(0), endTimes = new Array(n).fill(0)
  let startIndex = 0, endIndex = 0
  let res = 0
  // 把传入的时间数组分别保存开始时间和结束时间
  for (let i = 0; i < n; ++i) {
    startTimes[i] = arr[i][0]
    endTimes[i] = arr[i][1]
  }
  // 分别排序 这样会使时间之间的联系被打掉
  startTimes.sort((a, b) => a - b)
  endTimes.sort((a, b) => a - b)
  while (startIndex < n) {
    // 当开始时间比结束时间更大，说明会议结束 会议室 -1
    if (startTimes[startIndex] >= endTimes[endIndex]) {
      res--
      endIndex++
    }
    // 进入循环 使用的会议室+1，开始时间数组index + 1
    res++
    startIndex++
  }
  return res
};