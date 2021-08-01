const path = require('path');

/**
 * 相同点： 支持任意参数，拼接成系统合法的路径 支持'..'等路径参数
 * 不同点： join只拼参数，resolve拼接到当前目录路径之后补充参数路径
 */

const resolvePath = path.resolve('a', 'b', 'c')
const joinPath = path.join('a', 'b', 'c')

console.log(resolvePath)
console.log(joinPath)

console.log(__dirname)
console.log(__filename)


console.log(path.extname(__filename)) // 后缀
console.log(path.basename(__filename)) // 文件名
console.log(path.dirname(__filename)) // 文件夹路径