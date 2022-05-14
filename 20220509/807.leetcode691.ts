/**
 * 2022/05/14 每日一题 691. 贴纸拼词
 * 我们有 n 种不同的贴纸。每个贴纸上都有一个小写的英文单词。
 * 
 * 您想要拼写出给定的字符串 target ，方法是从收集的贴纸中切割单个字母并重新排列它们。如果你愿意，你可以多次使用每个贴纸，每个贴纸的数量是无限的。
 * 
 * 返回你需要拼出 target 的最小贴纸数量。如果任务不可能，则返回 -1 。
 * 
 * 注意：在所有的测试用例中，所有的单词都是从 1000 个最常见的美国英语单词中随机选择的，并且 target 被选择为两个随机单词的连接。
 * 
 * 示例 1：
 * 
 * 输入： stickers = ["with","example","science"], target = "thehat"
 * 输出：3
 * 解释：
 * 我们可以使用 2 个 "with" 贴纸，和 1 个 "example" 贴纸。
 * 把贴纸上的字母剪下来并重新排列后，就可以形成目标 “thehat“ 了。
 * 此外，这是形成目标字符串所需的最小贴纸数量。
 * 示例 2:
 * 
 * 输入：stickers = ["notice","possible"], target = "basicbasic"
 * 输出：-1
 * 解释：我们不能通过剪切给定贴纸的字母来形成目标“basicbasic”。
 *  
 * 
 * 提示:
 * 
 * n == stickers.length
 * 1 <= n <= 50
 * 1 <= stickers[i].length <= 10
 * 1 <= target <= 15
 * stickers[i] 和 target 由小写英文单词组成
 */
function minStickers(stickers: string[], target: string): number {
  const n = target.length
  const arr = new Array(1 << n).fill(-1)
  arr[0] = 0
  const res = dp(stickers, target, arr, (1 << n) - 1)
  return res <= n ? res : -1
};
function dp(stickers, target, memo, mask) {
  const n = target.length
  if (memo[mask] < 0) {
    let res = n + 1
    for (const sticker of stickers) {
      let left = mask
      const cnt = new Array(26).fill(0)
      for (let i = 0; i < sticker.length; ++i) {
        cnt[sticker[i].charCodeAt() - 'a'.charCodeAt(0)]++
      }
      for (let i = 0; i < target.length; ++i) {
        const c = target[i]
        if (((mask >> i) & 1) === 1 && cnt[c.charCodeAt() - 'a'.charCodeAt(0)] > 0) {
          cnt[c.charCodeAt() - 'a'.charCodeAt(0)]--
          left ^= 1 << i
        }
      }
      if (left < mask) {
        res = Math.min(res, dp(stickers, target, memo, left) + 1)
      }
    }
    memo[mask] = res
  }
  return memo[mask]
}

/**
 * 解法 2
 */
 function minStickers(stickers: string[], target: string): number {
  return new Sticker().memoriedMinStickers(stickers, target)
};

class Sticker {
// 从左往右的尝试模型
bruteMinStickers = (stickers: string[], target: string): number => {
  const answer = this.bruteProcess(stickers, target);
  return answer === Infinity ? -1 : answer;
};

private bruteProcess = (stickers: string[], target: string): number => {
  if (target === "") {
    return 0;
  }

  let count = Infinity;
  // 思路: 用每张贴纸来一一地试target 看用完这一张贴纸之后, 还剩多少个字符, 这样的复杂度如果 sticker 很长的话, 会比较高
  for (const sticker of stickers) {
    const rest = this.minus(target, sticker);
    // 如果使用当前字符减了之后, 文字长度没变, 说明不包含有当前贴纸的字符, 所以不用再试当前的这个 sticker
    if (rest.length !== target.length) {
      count = Math.min(count, this.bruteProcess(stickers, rest));
    }
  }

  return count === Infinity ? Infinity : count + 1;
};

private getCharMap = (text: string) => {
  const map = new Map<string, number>();
  for (const char of text) {
    const count = map.get(char) || 0;
    map.set(char, count + 1);
  }
  return map;
};

private minus = (source: string, text: string): string => {
  const textMap = this.getCharMap(text);
  const sourceMap = this.getCharMap(source);

  for (const [key, value] of textMap) {
    const sourceValue = sourceMap.get(key);
    if (sourceValue !== undefined) {
      const rest = Math.max(0, sourceValue - value);
      sourceMap.set(key, rest);
    }
  }

  let str = "";
  for (const [char, count] of sourceMap) {
    for (let i = 0; i < count; i++) {
      str += char;
    }
  }
  return str;
};

bruteMinStickers2 = (stickers: string[], target: string): number => {
  const chars: number[][] = stickers.map((sticker) => {
    const counts = new Array(26).fill(0);
    for (const char of sticker) {
      counts[char.charCodeAt(0) - 97]++;
    }
    return counts;
  });
  const answer = this.bruteProcess2(chars, target);
  return answer === Infinity ? -1 : answer;
};

private bruteProcess2 = (stickers: number[][], target: string): number => {
  if (target === "") {
    return 0;
  }

  const targetCounts = new Array(26).fill(0);
  for (const char of target) {
    targetCounts[char.charCodeAt(0) - 97]++;
  }
  let min = Infinity;
  for (let i = 0; i < stickers.length; i++) {
    const stickerCount = stickers[i];
    const firstCharCodeIndex = target[0].charCodeAt(0) - 97;

    // 跟上面的暴力不同, 这里使用 target来匹配 stickers 数组, 如果一开是就没有匹配这个字符的就先跳过了
    // 即只匹配那些肯定可以匹配的字符
    if (stickerCount[firstCharCodeIndex] > 0) {
      let str = "";
      for (let j = 0; j < 26; j++) {
        if (targetCounts[j] > 0) {
          const restNum = targetCounts[j] - stickerCount[j];
          for (let k = 0; k < restNum; k++) {
            str += String.fromCharCode(j + 97);
          }
        }
      }

      min = Math.min(min, this.bruteProcess2(stickers, str));
    }
  }

  return min === Infinity ? min : min + 1;
};

memoriedMinStickers = (stickers: string[], target: string): number => {
  const chars: number[][] = stickers.map((sticker) => {
    const counts = new Array(26).fill(0);
    for (const char of sticker) {
      counts[char.charCodeAt(0) - 97]++;
    }
    return counts;
  });
  const dp = new Map<string, number>();
  dp.set("", 0);
  const answer = this.memoriedProcess(chars, target, dp);
  return answer === Infinity ? -1 : answer;
};

private memoriedProcess = (
  stickers: number[][],
  target: string,
  dp: Map<string, number>
): number => {
  if (dp.get(target) !== undefined) {
    return dp.get(target)!;
  }

  const targetCounts = new Array(26).fill(0);
  for (const char of target) {
    targetCounts[char.charCodeAt(0) - 97]++;
  }
  let min = Infinity;
  for (let i = 0; i < stickers.length; i++) {
    const stickerCount = stickers[i];
    const firstCharCodeIndex = target[0].charCodeAt(0) - 97;

    // 跟上面的暴力不同, 这里使用 target来匹配 stickers 数组, 如果一开是就没有匹配这个字符的就先跳过了
    // 即只匹配那些肯定可以匹配的字符 (剪枝, 也是贪心!)
    if (stickerCount[firstCharCodeIndex] > 0) {
      let str = "";
      for (let j = 0; j < 26; j++) {
        if (targetCounts[j] > 0) {
          const restNum = targetCounts[j] - stickerCount[j];
          for (let k = 0; k < restNum; k++) {
            str += String.fromCharCode(j + 97);
          }
        }
      }

      min = Math.min(min, this.memoriedProcess(stickers, str, dp));
    }
  }
  min = min === Infinity ? min : min + 1;
  dp.set(target, min);
  return min;
};
}
