/**
 * 2020/09/07 每日一题 347. 前 K 个高频元素
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 * 示例 1:
 *
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 * 示例 2:
 *
 * 输入: nums = [1], k = 1
 * 输出: [1]
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// map + 数组 时间复杂度O(nlogn)  空间复杂度O(n)
var topKFrequent = function (nums, k) {
  if (!nums || k == 0) return [];
  let map = new Map(),
    arr = [...new Set(nums)];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });
  return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};

// 桶排序 时间复杂度O(n) 空间复杂度O(n)
var topKFrequent = function (nums, k) {
  // 桶排序
  let bucketSort = (map, k) => {
    let arr = [], res = [];
    map.forEach((value, key) => {
      // 利用映射关系（出现频率作为下标）将数据分配到各个桶中
      if (!arr[value]) {
        arr[value] = [key];
      } else {
        arr[value].push(key);
      }
    });
    // 倒序遍历获取出现频率最大的前k个数
    for (let i = arr.length - 1; i >= 0 && res.length < k; i--) {
      if (arr[i]) {
        res.push(...arr[i]);
      }
    }
    return res;
  };
  let map = new Map(),
    arr = [...new Set(nums)];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });
  // 如果元素数量小于等于k
  if (map.size <= k) {
    return [...map.keys()];
  }
  return bucketSort(map, k);
};
