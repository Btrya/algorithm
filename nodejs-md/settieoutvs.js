/**
 * 主模块中执行
 * 两者的执行顺序是不固定的，可能timeout在前，可能immediate在前
 */
setImmediate(() => {
  console.log('immediate')
});

setTimeout(() => {
  console.log('timeout')
}, 0);

/**
 * 在同一个I/O回调中执行
 * timeout 固定在后
 */
const fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('fs timeout')
  }, 0);
  
  setImmediate(() => {
    console.log('fs immediate')
  });
})

