function generate(arr1, arr2) {
  let map = {}, res = []
  for (let i = 0; i < arr2.length; ++i) {
    map[arr2[i]] = (map[arr2[i]] || 0) + 1
  }
  for (let i = 0; i < arr1.length; ++i) {
    if (map[arr1[i]] && map[arr1[i]]--) res.push(arr1[i])
  }
  return res
}

console.log(generate([1,2,1,2], [3,1,1,2]))