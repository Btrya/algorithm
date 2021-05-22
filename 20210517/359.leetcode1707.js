/**
 * 2021/05/23 每日一题 1707.与数组中元素的最大异或值
 * 给你一个由非负整数组成的数组 nums 。另有一个查询数组 queries ，其中 queries[i] = [xi, mi] 。
 * 
 * 第 i 个查询的答案是 xi 和任何 nums 数组中不超过 mi 的元素按位异或（XOR）得到的最大值。换句话说，答案是 max(nums[j] XOR xi) ，
 * 其中所有 j 均满足 nums[j] <= mi 。如果 nums 中的所有元素都大于 mi，最终答案就是 -1 。
 * 
 * 返回一个整数数组 answer 作为查询的答案，其中 answer.length == queries.length 且 answer[i] 是第 i 个查询的答案。
 * 示例 1：
 * 
 * 输入：nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
 * 输出：[3,3,7]
 * 解释：
 * 1) 0 和 1 是仅有的两个不超过 1 的整数。0 XOR 3 = 3 而 1 XOR 3 = 2 。二者中的更大值是 3 。
 * 2) 1 XOR 2 = 3.
 * 3) 5 XOR 2 = 7.
 * 示例 2：
 * 
 * 输入：nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
 * 输出：[15,-1,5]
 */
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var maximizeXor = function(nums, queries) {
  const result = new Array(queries.length);
  // we must use an array to save on space
  // objects and maps take up too much memory
  // we create a trie so that we can easily find
  // the best result
  const trie = [null, null];
  for (let num of nums) {
    let node = trie;
	// we start at 30 because 10 ** 9 is our max value and 2 ** 30 > 10 ** 9
    for (let i = 30; i >= 0; i--) {
      const b = 1 << i;
      if (b & num) {
        if (!node[1]) {
          node[1] = [null, null];
        }
        node = node[1];
      } else {
        if (!node[0]) {
          node[0] = [null, null];
        }
        node = node[0];
      }
    }
  }

  // do a quick check to find the minimum value
  // to speed up our run time
  const min = Math.min(...nums);

  // this is our main function that will traverse the trie
  const dfs = (node, num, i, xorVal, max) => {

    // if we don't have a node then there was no number
	// with this bit set/unset so we return -1
	// also if our value that we are trying to XOR is
	// greater than the max, we return -1
    if (!node || xorVal > max) {
      return -1;
    }

	// this is our base case and we found a matching value
	// so we can return the value
    if (i === -1) return xorVal;
	
	// create a bit mask of our current bit we are examining
    const bit = 1 << i;
	
	// decrement i for our next call
	// we won't need i anymore for the remainder of this call
    i--;
	
	// if the bit is greater than the max then we only have 1 option
	// we must take the unset bit which is 0
	// so we traverse node[0] and pass along all other values
    if (bit > max) {
      return dfs(node[0], num, i, xorVal, max);
    }
	
	// if the bit is set in num
    if (num & bit) {
	  // then we want to preference the unset bit
	  // in the xorVal
	  // if it's possible then we return it
	  // otherwise we try to set the bit
      let x = dfs(node[0], num, i, xorVal, max);
      if (x > -1) {
        return x;
      }
      return dfs(node[1], num, i, xorVal | bit, max);
	  
	// this is just the opposite of above
	// where we preference the set bit
	// because the bit is not set in num
    } else {
      let y = dfs(node[1], num, i, xorVal | bit, max);
      if (y > -1) {
        return y;
      }
      return dfs(node[0], num, i, xorVal, max);
    }
  };

  // Iterate through the numbers
  for (let i = 0; i < queries.length; i++) {
    const [num, max] = queries[i];
	// do a fast check to minimize the work done
    if (max < min) {
      result[i] = -1;
      continue;
    }
	// store the result for the num XOR the result
    result[i] = dfs(trie, num, 30, 0, max) ^ num
  }
  return result;
};