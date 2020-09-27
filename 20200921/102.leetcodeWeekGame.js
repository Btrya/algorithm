/**
 * 2020/09/27 208周赛 
 * 5523. 文件夹操作日志搜集器
 * 每当用户执行变更文件夹操作时，LeetCode 文件系统都会保存一条日志记录。
 * 下面给出对变更操作的说明：
 * "../" ：移动到当前文件夹的父文件夹。如果已经在主文件夹下，则 继续停留在当前文件夹 。
 * "./" ：继续停留在当前文件夹。
 * "x/" ：移动到名为 x 的子文件夹中。题目数据 保证总是存在文件夹 x 。
 * 给你一个字符串列表 logs ，其中 logs[i] 是用户在 ith 步执行的操作。
 * 文件系统启动时位于主文件夹，然后执行 logs 中的操作。
 * 执行完所有变更文件夹操作后，请你找出 返回主文件夹所需的最小步数 。
 */
/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function(logs) {
  if (!logs) return 0
  let sum = 0
  for (let i = 0; i < logs.length; i++) {
    if (logs[i] == '../') {
      sum = sum == 0 ? 0 : sum - 1
    } else if (logs[i] != './') {
      sum ++
    }
  }
  return sum
};

/**
 * 5524. 经营摩天轮的最大利润
 * 你正在经营一座摩天轮，该摩天轮共有 4 个座舱 ，每个座舱 最多可以容纳 4 位游客 。
 * 你可以 逆时针 轮转座舱，但每次轮转都需要支付一定的运行成本 runningCost 。摩天轮每次轮转都恰好转动 1 / 4 周。
 * 给你一个长度为 n 的数组 customers ， customers[i] 是在第 i 次轮转（下标从 0 开始）之前到达的新游客的数量。
 * 这也意味着你必须在新游客到来前轮转 i 次。每位游客在登上离地面最近的座舱前都会支付登舱成本 boardingCost ，一旦该座舱再次抵达地面，他们就会离开座舱结束游玩。
 * 你可以随时停下摩天轮，即便是 在服务所有游客之前 。如果你决定停止运营摩天轮，为了保证所有游客安全着陆，将免费进行所有后续轮转 。
 * 注意，如果有超过 4 位游客在等摩天轮，那么只有 4 位游客可以登上摩天轮，其余的需要等待 下一次轮转 。
 * 返回最大化利润所需执行的 最小轮转次数 。 如果不存在利润为正的方案，则返回 -1 。
 */
/**
 * @param {number[]} customers
 * @param {number} boardingCost
 * @param {number} runningCost
 * @return {number}
 */
var minOperationsMaxProfit = function(customers, boardingCost, runningCost) {
  let maxProfits = 0
  let waitNum = customers[0]
};