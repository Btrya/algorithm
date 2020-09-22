/**
 * 2020/09/22 每日一题 968. 监控二叉树  
 * https://leetcode-cn.com/problems/binary-tree-cameras/
 * 给定一个二叉树，我们在树的节点上安装摄像头。
 * 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
 * 计算监控树的所有节点所需的最小摄像头数量。
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
 * @return {number}
 */
var minCameraCover = function(root) {
  const minCam = (root) => {
    if (root == null) {   // base case
      return {
        withCam: Infinity,
        noCamWatchByDad: 0,
        noCamWatchBySon: 0
      };
    }
    const left = minCam(root.left);   // 以左儿子为根的左子树的情况
    const right = minCam(root.right); // 以右儿子为根的右子树的情况
    // 下面是三个“状态转移通式”
    const withCam = 1 + Math.min(     
      left.noCamWatchByDad + right.noCamWatchByDad,
      left.withCam + right.noCamWatchByDad,
      left.noCamWatchByDad + right.withCam
    );
    const noCamWatchByDad = Math.min(
      left.withCam + right.withCam,
      left.withCam + right.noCamWatchBySon,
      left.noCamWatchBySon + right.withCam,
      left.noCamWatchBySon + right.noCamWatchBySon
    );
    const noCamWatchBySon = Math.min(
      left.withCam + right.withCam,
      left.withCam + right.noCamWatchBySon,
      left.noCamWatchBySon + right.withCam
    );

    return { withCam, noCamWatchByDad, noCamWatchBySon }; // 返回给父调用参考
  };
  const res = minCam(root); // 相当于 dp[root]
  return Math.min(res.withCam, res.noCamWatchBySon); // root有相机，root没有相机，被儿子监控
};