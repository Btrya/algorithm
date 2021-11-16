/**
 * 2021/11/16 每日一题 391. 完美矩形
 * https://leetcode-cn.com/problems/perfect-rectangle/
 */
/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function (rectangles) {
  let area = 0;
  let minX = rectangles[0][0],
    minY = rectangles[0][1],
    maxX = rectangles[0][2],
    maxY = rectangles[0][3];
  const cnt = new Map();
  for (const rect of rectangles) {
    const x = rect[0],
      y = rect[1],
      a = rect[2],
      b = rect[3];
    area += (a - x) * (b - y); // 计算所有矩形的总面积
    // 计算所有矩形的四个值是否是最边缘的坐标值 用于计算出合并后矩形的顶点
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, a);
    maxY = Math.max(maxY, b);
    // 统计每个顶点出现的次数
    cnt.set([x, y].toString(), (cnt.get([x, y].toString()) || 0) + 1);
    cnt.set([x, b].toString(), (cnt.get([x, b].toString()) || 0) + 1);
    cnt.set([a, y].toString(), (cnt.get([a, y].toString()) || 0) + 1);
    cnt.set([a, b].toString(), (cnt.get([a, b].toString()) || 0) + 1);
  }
  // 顶点format转string格式 如：'1, 1'，得到合并后矩形四个顶点
  const pointMinMin = [minX, minY].toString();
  const pointMinMax = [minX, maxY].toString();
  const pointMaxMin = [maxX, minY].toString();
  const pointMaxMax = [maxX, maxY].toString();
  // 合并后矩形面积不等于所有矩形总面积 || 边缘定点统计次数多于1 说明重叠返回false
  if (area !== (maxX - minX) * (maxY - minY) || (cnt.get(pointMinMin) || 0) !== 1 || (cnt.get(pointMinMax) || 0) !== 1 || (cnt.get(pointMaxMin) || 0) !== 1 || (cnt.get(pointMaxMax) || 0) !== 1) {
    return false;
  }
  // map移除合并后矩形的数据点，这些都是1
  cnt.delete(pointMinMin);
  cnt.delete(pointMinMax);
  cnt.delete(pointMaxMin);
  cnt.delete(pointMaxMax);
  // 然后遍历统计到的数据，由于矩形拼接 顶点一定会有重复的，只要不是 2 || 4 就说明不是放在一起的
  for (const [_, value] of cnt.entries()) {
    if (value !== 2 && value !== 4) {
      return false;
    }
  }
  return true;
};

// 优化版本
/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
 var isRectangleCover = function(rectangles) {
  const n = rectangles.length, record = new Set()
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, sumArea = 0
  for (const [x1, y1, x2, y2] of rectangles) {
    minX = Math.min(minX, x1)
    minY = Math.min(minY, y1)
    maxX = Math.max(maxX, x2)
    maxY = Math.max(maxY, y2)
    sumArea += (x2 - x1) * (y2 - y1)
    const arr = [`${x1} ${y1}`, `${x1} ${y2}`, `${x2} ${y1}`, `${x2} ${y2}`]
    arr.forEach(k => record.has(k) ? record.delete(k) : record.add(k))
  }
  return sumArea === (maxX - minX) * (maxY - minY) && record.size === 4 && [`${minX} ${minY}`, `${minX} ${maxY}`, `${maxX} ${minY}`, `${maxX} ${maxY}`].every(k => record.has(k))
};