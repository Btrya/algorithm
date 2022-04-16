/**
 * 2022/04/16 力扣春季赛
 * 1. 宝石补给
 * 欢迎各位勇者来到力扣新手村，在开始试炼之前，请各位勇者先进行「宝石补给」。
 * 
 * 每位勇者初始都拥有一些能量宝石， gem[i] 表示第 i 位勇者的宝石数量。现在这些勇者们进行了一系列的赠送，operations[j] = [x, y] 表示在第 j 次的赠送中 第 x 位勇者将自己一半的宝石（按需向下取整）赠送给第 y 位勇者。
 * 
 * 在完成所有的赠送后，请找到拥有最多宝石的勇者和拥有最少宝石的勇者，并返回他们二者的宝石数量之差。
 * 
 * 注意：
 * 
 * 赠送将按顺序逐步进行。
 * 示例 1：
 * 
 * 输入：gem = [3,1,2], operations = [[0,2],[2,1],[2,0]]
 * 
 * 输出：2
 * 
 * 解释：
 * 第 1 次操作，勇者 0 将一半的宝石赠送给勇者 2， gem = [2,1,3]
 * 第 2 次操作，勇者 2 将一半的宝石赠送给勇者 1， gem = [2,2,2]
 * 第 3 次操作，勇者 2 将一半的宝石赠送给勇者 0， gem = [3,2,1]
 * 返回 3 - 1 = 2
 * 
 * 示例 2：
 * 
 * 输入：gem = [100,0,50,100], operations = [[0,2],[0,1],[3,0],[3,0]]
 * 
 * 输出：75
 * 
 * 解释：
 * 第 1 次操作，勇者 0 将一半的宝石赠送给勇者 2， gem = [50,0,100,100]
 * 第 2 次操作，勇者 0 将一半的宝石赠送给勇者 1， gem = [25,25,100,100]
 * 第 3 次操作，勇者 3 将一半的宝石赠送给勇者 0， gem = [75,25,100,50]
 * 第 4 次操作，勇者 3 将一半的宝石赠送给勇者 0， gem = [100,25,100,25]
 * 返回 100 - 25 = 75
 * 
 * 示例 3：
 * 
 * 输入：gem = [0,0,0,0], operations = [[1,2],[3,1],[1,2]]
 * 
 * 输出：0
 * 
 * 提示：
 * 
 * 2 <= gem.length <= 10^3
 * 0 <= gem[i] <= 10^3
 * 0 <= operations.length <= 10^4
 * operations[i].length == 2
 * 0 <= operations[i][0], operations[i][1] < gem.length
 */
/**
 * @param {number[]} gem
 * @param {number[][]} operations
 * @return {number}
 */
 var giveGem = function(gem, operations) {
  for (let oper of operations) {
    const [from, to] = oper
    const tmp = Math.floor(gem[from] / 2)
    gem[from] -= tmp
    gem[to] += tmp
  }
  return Math.max(...gem) - Math.min(...gem)
};

/**
 * 2. 烹饪料理
 * 欢迎各位勇者来到力扣城，城内设有烹饪锅供勇者制作料理，为自己恢复状态。
 * 
 * 勇者背包内共有编号为 0 ~ 4 的五种食材，其中 meterials[j] 表示第 j 种食材的数量。通过这些食材可以制作若干料理，cookbooks[i][j] 表示制作第 i 种料理需要第 j 种食材的数量，而 attribute[i] = [x,y] 表示第 i 道料理的美味度 x 和饱腹感 y。
 * 
 * 在饱腹感不小于 limit 的情况下，请返回勇者可获得的最大美味度。如果无法满足饱腹感要求，则返回 -1。
 * 
 * 注意：
 * 
 * 每种料理只能制作一次。
 * 示例 1：
 * 
 * 输入：meterials = [3,2,4,1,2]
 * cookbooks = [[1,1,0,1,2],[2,1,4,0,0],[3,2,4,1,0]]
 * attribute = [[3,2],[2,4],[7,6]]
 * limit = 5
 * 
 * 输出：7
 * 
 * 解释：
 * 食材数量可以满足以下两种方案：
 * 方案一：制作料理 0 和料理 1，可获得饱腹感 2+4、美味度 3+2
 * 方案二：仅制作料理 2， 可饱腹感为 6、美味度为 7
 * 因此在满足饱腹感的要求下，可获得最高美味度 7
 * 
 * 示例 2：
 * 
 * 输入：meterials = [10,10,10,10,10]
 * cookbooks = [[1,1,1,1,1],[3,3,3,3,3],[10,10,10,10,10]]
 * attribute = [[5,5],[6,6],[10,10]]
 * limit = 1
 * 
 * 输出：11
 * 
 * 解释：通过制作料理 0 和 1，可满足饱腹感，并获得最高美味度 11
 * 
 * 提示：
 * 
 * meterials.length == 5
 * 1 <= cookbooks.length == attribute.length <= 8
 * cookbooks[i].length == 5
 * attribute[i].length == 2
 * 0 <= meterials[i], cookbooks[i][j], attribute[i][j] <= 20
 * 1 <= limit <= 100
 */
/**
 * @param {number[]} materials
 * @param {number[][]} cookbooks
 * @param {number[][]} attribute
 * @param {number} limit
 * @return {number}
 */
 var perfectMenu = function(materials, cookbooks, attribute, limit) {
  // 扣除相应食材 不能扣除返回false 可以扣除得到当前剩余食材
  const delMaterials = (origin, diff) => {
    const res = []
    for (let i = 0; i < origin.length; ++i) {
      if (origin[i] - diff[i] >= 0) res.push(origin[i] - diff[i])
      else return -1
    }
    return res
  }
  let res = []
  const dfs = (materials, full, happy, level) => {
    for (let i = level; i <= cookbooks.length; ++i) {
      if (i === cookbooks.length) {
        res.push(full >= limit ? happy : -1) 
        continue
      }
      const diffMatrials = delMaterials(materials, cookbooks[i])
      // 食材不足
      if (diffMatrials === -1) {
        res.push(full >= limit ? happy : -1) 
        continue
      }
      const nextFull = full + attribute[i][1]
      const nextHappy = happy + attribute[i][0]
      dfs(diffMatrials, nextFull, nextHappy, i + 1)
    }
  }
  dfs(materials, 0, 0, 0)
  return Math.max(-1, ...res)
};


/**
 * 3. 二叉搜索树染色
 * 欢迎各位勇者来到力扣城，本次试炼主题为「二叉搜索树染色」。
 * 
 * 每位勇士面前设有一个二叉搜索树的模型，模型的根节点为 root，树上的各个节点值均不重复。初始时，所有节点均为蓝色。现在按顺序对这棵二叉树进行若干次操作， ops[i] = [type, x, y] 表示第 i 次操作为：
 * 
 * type 等于 0 时，将节点值范围在 [x, y] 的节点均染蓝
 * type 等于 1 时，将节点值范围在 [x, y] 的节点均染红
 * 请返回完成所有染色后，该二叉树中红色节点的数量。
 * 
 * 注意：
 * 
 * 题目保证对于每个操作的 x、y 值定出现在二叉搜索树节点中
 * 示例 1：
 * 
 * 输入：root = [1,null,2,null,3,null,4,null,5], ops = [[1,2,4],[1,1,3],[0,3,5]]
 * 
 * 输出：2
 * 
 * 解释：
 * 第 0 次操作，将值为 2、3、4 的节点染红；
 * 第 1 次操作，将值为 1、2、3 的节点染红；
 * 第 2 次操作，将值为 3、4、5 的节点染蓝；
 * 因此，最终值为 1、2 的节点为红色节点，返回数量 2
 * image.png
 * 
 * 示例 2：
 * 
 * 输入：root = [4,2,7,1,null,5,null,null,null,null,6]
 * ops = [[0,2,2],[1,1,5],[0,4,5],[1,5,7]]
 * 
 * 输出：5
 * 
 * 解释：
 * 第 0 次操作，将值为 2 的节点染蓝；
 * 第 1 次操作，将值为 1、2、4、5 的节点染红；
 * 第 2 次操作，将值为 4、5 的节点染蓝；
 * 第 3 次操作，将值为 5、6、7 的节点染红；
 * 因此，最终值为 1、2、5、6、7 的节点为红色节点，返回数量 5
 * image.png
 * 
 * 提示：
 * 
 * 1 <= 二叉树节点数量 <= 10^5
 * 1 <= ops.length <= 10^5
 * ops[i].length == 3
 * ops[i][0] 仅为 0 or 1
 * 0 <= ops[i][1] <= ops[i][2] <= 10^9
 * 0 <= 节点值 <= 10^9
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[][]} ops
 * @return {number}
 */
var getNumber = function(root, ops) {
  const arr = []
  const dfs = (node) => {
    if (!node) return 
    arr.push(node.val)
    if (node.left) dfs(node.left)
    if (node.right) dfs(node.right)
  }
  dfs(root)
  let res = 0
  const findNode = (node) => {
    for (let i = ops.length - 1; i >= 0; --i) {
      const [type, from, to] = ops[i]
      if (from <= node && to >= node) {
        if (type === 1) res++
        break
      }
    }
  }
  for (let i = 0; i < arr.length; ++i) {
      findNode(arr[i])
  }
  return res
}