/**
 * 2021/01/31 每日一题 839.相似字符串组
 * 如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。
 * 例如，"tars" 和 "rats" 是相似的 (交换 0 与 2 的位置)； "rats" 和 "arts" 也是相似的，但是 "star" 不与 "tars"，"rats"，或 "arts" 相似。
 * 总之，它们通过相似性形成了两个关联组：{"tars", "rats", "arts"} 和 {"star"}。
 * 注意，"tars" 和 "arts" 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。
 * 给你一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个字母异位词。请问 strs 中有多少个相似字符串组？
 * 示例 1：
 * 输入：strs = ["tars","rats","arts","star"]
 * 输出：2
 * 示例 2：
 * 输入：strs = ["omv","ovm"]
 * 输出：1
 * 提示：
 * 1 <= strs.length <= 100
 * 1 <= strs[i].length <= 1000
 * sum(strs[i].length) <= 2 * 104
 * strs[i] 只包含小写字母。
 * strs 中的所有单词都具有相同的长度，且是彼此的字母异位词。
 */
/**
 * @param {string[]} strs
 * @return {number}
 */
class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((element, index) => index);
    this.size = new Array(n).fill(1);
    // 当前连通分量数目
    this.setCount = n;
  }

  find(x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(a, b) {
    let x = this.find(a),
      y = this.find(b);
    if (x === y) {
      return false;
    }
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
    this.setCount -= 1;
    return true;
  }

  connect(a, b) {
    const x = this.find(a),
      y = this.find(b);
    return x === y;
  }

  getCount() {
    return this.setCount
  }
}
var numSimilarGroups = function(strs) {
  const length = strs.length;
  const uf = new UnionFind(length);
  //校验两个字符串是否是相似的
  const checkStrIsSimilar = (str1, str2) => {
    let number = 0;
    //对比不同位置上的不相等的元素的个数
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        number++;
        if (number > 2) return false;
      }
    }
    return number === 2 || number=== 0;
  };

  //步骤1
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      //当两个字符串不连通的时候进行校验是否是相似的字符串
      //如果相似就加入连通域
      if (!uf.connect(i, j)) {
        const flag = checkStrIsSimilar(strs[i], strs[j]);
        if (flag) {
          uf.union(i, j);
        }
      }
    }
  }
  //步骤2
  return uf.getCount()
};