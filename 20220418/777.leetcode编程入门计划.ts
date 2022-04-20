/**
 * 2022/04/20 编程入门计划
 * 589. N 叉树的前序遍历
 * https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/
 */
/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */
/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */
function preorder(root: Node | null): number[] {
  if (!root) return []
  const stack = []
  const res: number[] = []
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push(node.children[i])
    }
  }
  return res
};


/**
 * 496. 下一个更大元素 I
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
 * 
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
 * 
 * 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
 * 
 * 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 * - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
 * - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 * 示例 2：
 * 
 * 输入：nums1 = [2,4], nums2 = [1,2,3,4].
 * 输出：[3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
 * - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums1.length <= nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 104
 * nums1和nums2中所有整数 互不相同
 * nums1 中的所有整数同样出现在 nums2 中
 *  
 * 
 * 进阶：你可以设计一个时间复杂度为 O(nums1.length + nums2.length) 的解决方案吗？
 */
 function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const map = {}
  const n2 = nums2.length, n1 = nums1.length
  const res = new Array(n1).fill(-1)
  for (let i = 0; i < n2; ++i) {
    let pos = i + 1
    map[nums2[i]] = -1
    while (pos < n2) {
      if (nums2[pos] > nums2[i]) {
        map[nums2[i]] = nums2[pos]
        break
      }
      pos++
    }
  }
  for (let i = 0; i < n1; ++i) {
    res[i] = map[nums1[i]]
  }
  return res
};

/**
 * 1232. 缀点成线
 * https://leetcode-cn.com/problems/check-if-it-is-a-straight-line/
 */
 function checkStraightLine(coordinates: number[][]): boolean {
  const n = coordinates.length
  coordinates.sort((a, b) => a[0] - b[0])
  let diff = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n - 1; ++i) {
    const [x1, y1] = coordinates[i]
    const [x2, y2] = coordinates[i + 1]
    const k = x1 === x2 ? null : (y2 - y1) / (x2 - x1)
    if (diff === Number.MAX_SAFE_INTEGER) diff = k
    if (k !== diff) return false
  }
  return true
};