/**
 * 2022/04/26 编程入门计划
 * 1356. 根据数字二进制下 1 的数目排序
 * 给你一个整数数组 arr 。请你将数组中的元素按照其二进制表示中数字 1 的数目升序排序。
 *
 * 如果存在多个数字二进制中 1 的数目相同，则必须将它们按照数值大小升序排列。
 *
 * 请你返回排序后的数组。
 *
 * 示例 1：
 *
 * 输入：arr = [0,1,2,3,4,5,6,7,8]
 * 输出：[0,1,2,4,8,3,5,6,7]
 * 解释：[0] 是唯一一个有 0 个 1 的数。
 * [1,2,4,8] 都有 1 个 1 。
 * [3,5,6] 有 2 个 1 。
 * [7] 有 3 个 1 。
 * 按照 1 的个数排序得到的结果数组为 [0,1,2,4,8,3,5,6,7]
 * 示例 2：
 *
 * 输入：arr = [1024,512,256,128,64,32,16,8,4,2,1]
 * 输出：[1,2,4,8,16,32,64,128,256,512,1024]
 * 解释：数组中所有整数二进制下都只有 1 个 1 ，所以你需要按照数值大小将它们排序。
 * 示例 3：
 *
 * 输入：arr = [10000,10000]
 * 输出：[10000,10000]
 * 示例 4：
 *
 * 输入：arr = [2,3,5,7,11,13,17,19]
 * 输出：[2,3,5,17,7,11,13,19]
 * 示例 5：
 *
 * 输入：arr = [10,100,1000,10000]
 * 输出：[10,100,10000,1000]
 *
 *
 * 提示：
 *
 * 1 <= arr.length <= 500
 * 0 <= arr[i] <= 10^4
 */
function sortByBits(arr: number[]): number[] {
  function mySort(a, b) {
    const aCount = countOneNum(a)
    const bCount = countOneNum(b)
    if (aCount !== bCount) return aCount - bCount
    return a - b
  }
  function countOneNum(num) {
    let count = 0
    while (num) {
      num = num & (num - 1)
      count++
    }
    return count
  }
  return arr.sort(mySort)
}

/**
 * 232. 用栈实现队列
 * 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
 *
 * 实现 MyQueue 类：
 *
 * void push(int x) 将元素 x 推到队列的末尾
 * int pop() 从队列的开头移除并返回元素
 * int peek() 返回队列开头的元素
 * boolean empty() 如果队列为空，返回 true ；否则，返回 false
 * 说明：
 *
 * 你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
 * 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 *
 *
 * 示例 1：
 *
 * 输入：
 * ["MyQueue", "push", "push", "peek", "pop", "empty"]
 * [[], [1], [2], [], [], []]
 * 输出：
 * [null, null, null, 1, 1, false]
 *
 * 解释：
 * MyQueue myQueue = new MyQueue();
 * myQueue.push(1); // queue is: [1]
 * myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
 * myQueue.peek(); // return 1
 * myQueue.pop(); // return 1, queue is [2]
 * myQueue.empty(); // return false
 *
 *
 * 提示：
 *
 * 1 <= x <= 9
 * 最多调用 100 次 push、pop、peek 和 empty
 * 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）
 *
 *
 * 进阶：
 *
 * 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。
 */
class MyQueue {
  private s1: number[]
  private s2: number[]
  constructor() {
    this.s1 = []
    this.s2 = []
  }

  push(x: number): void {
    this.s1.push(x)
  }

  pop(): number {
    if (!this.s2.length) {
      while (this.s1.length) {
        this.s2.push(this.s1.pop())
      }
    }
    return this.s2.pop()
  }

  peek(): number {
    if (!this.s2.length) {
      while (this.s1.length) {
        this.s2.push(this.s1.pop())
      }
    }
    return this.s2[this.s2.length - 1];
  }

  empty(): boolean {
    return this.s1.length === 0 && this.s2.length === 0
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */


/**
 * 242. 有效的字母异位词
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 * 
 * 示例 1:
 * 
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 示例 2:
 * 
 * 输入: s = "rat", t = "car"
 * 输出: false
 *  
 * 
 * 提示:
 * 
 * 1 <= s.length, t.length <= 5 * 104
 * s 和 t 仅包含小写字母
 *  
 * 
 * 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 */
 function isAnagram(s: string, t: string): boolean {
  const map = {}
  for (let i = 0; i < s.length; ++i) {
    map[s[i]] = (map[s[i]] || 0) + 1
  }
  for (let i = 0; i < t.length; ++i) {
    map[t[i]] = (map[t[i]] || 0) - 1
  }
  for (const key in map) {
    if (map[key] !== 0) return false
  }
  return true
};

/**
 * 217. 存在重复元素
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
 *  
 * 示例 1：
 * 
 * 输入：nums = [1,2,3,1]
 * 输出：true
 * 示例 2：
 * 
 * 输入：nums = [1,2,3,4]
 * 输出：false
 * 示例 3：
 * 
 * 输入：nums = [1,1,1,3,3,4,3,2,4,2]
 * 输出：true
 *  
 * 提示：
 * 
 * 1 <= nums.length <= 105
 * -109 <= nums[i] <= 109
 */
 function containsDuplicate(nums: number[]): boolean {
  const map = {}
  for (let i = 0; i < nums.length; ++i) {
    if (map[nums[i]] === 1) return true
    map[nums[i]] = 1
  }
  return false
};