/**
 * 2022/02/28 每日一题 1601. 最多可达成的换楼请求数目
 * https://leetcode-cn.com/problems/maximum-number-of-achievable-transfer-requests/
 */
var maximumRequests = function (n, requests) {
  const delta = new Array(n).fill(0);
  let zero = n,
    ans = 0,
    cnt = 0;
  const dfs = (requests, pos) => {
    if (pos === requests.length) {
      if (zero === n) {
        ans = Math.max(ans, cnt);
      }
      return;
    }

    // 不选 requests[pos]
    dfs(requests, pos + 1);

    // 选 requests[pos]
    let z = zero;
    ++cnt;
    const r = requests[pos];
    let x = r[0],
      y = r[1];
    zero -= delta[x] == 0 ? 1 : 0;
    --delta[x];
    zero += delta[x] == 0 ? 1 : 0;
    zero -= delta[y] == 0 ? 1 : 0;
    ++delta[y];
    zero += delta[y] == 0 ? 1 : 0;
    dfs(requests, pos + 1);
    --delta[y];
    ++delta[x];
    --cnt;
    zero = z;
  }
  dfs(requests, 0);
  return ans;
};