/**
 * 2022/04/04 每日一题 307. 区域和检索 - 数组可修改
 * 给你一个数组 nums ，请你完成两类查询。
 * 
 * 其中一类查询要求 更新 数组 nums 下标对应的值
 * 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
 * 实现 NumArray 类：
 * 
 * NumArray(int[] nums) 用整数数组 nums 初始化对象
 * void update(int index, int val) 将 nums[index] 的值 更新 为 val
 * int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 *  
 * 
 * 示例 1：
 * 
 * 输入：
 * ["NumArray", "sumRange", "update", "sumRange"]
 * [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
 * 输出：
 * [null, 9, null, 8]
 * 
 * 解释：
 * NumArray numArray = new NumArray([1, 3, 5]);
 * numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
 * numArray.update(1, 2);   // nums = [1,2,5]
 * numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 3 * 104
 * -100 <= nums[i] <= 100
 * 0 <= index < nums.length
 * -100 <= val <= 100
 * 0 <= left <= right < nums.length
 * 调用 pdate 和 sumRange 方法次数不大于 3 * 104 
 */
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.tree = new Array(nums.length + 1).fill(0);
  this.nums = nums;
  for (let i = 0; i < nums.length; i++) {
    this.add(i + 1, nums[i]);
  }
};
NumArray.prototype.update = function (index, val) {
  this.add(index + 1, val - this.nums[index]);
  this.nums[index] = val;
};
NumArray.prototype.sumRange = function (left, right) {
  return this.prefixSum(right + 1) - this.prefixSum(left);
};
NumArray.prototype.lowBit = function (x) {
  return x & -x;
}
NumArray.prototype.add = function (index, val) {
  while (index < this.tree.length) {
    this.tree[index] += val;
    index += this.lowBit(index);
  }
}
NumArray.prototype.prefixSum = function (index) {
  let sum = 0;
  while (index > 0) {
    sum += this.tree[index];
    index -= this.lowBit(index);
  }
  return sum;
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */