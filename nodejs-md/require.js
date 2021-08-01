const vm = require('vm')
const fs = require('fs')
const path = require('path')

// const pathToFile = path.resolve(__dirname, './require-index.js')
// const content = fs.readFileSync(pathToFile, 'utf-8')

// const wrapper = [
//   '(function(require, module, exports) {',
//   '})'
// ]

// const wrappedContent = wrapper[0] + content + wrapper[1]

// const script = new vm.Script(wrappedContent, {
//   filename: 'index.js'
// })

// const result = script.runInThisContext()
// result()

function customeRequire(filename) {
  const pathToFile = path.resolve(__dirname, filename)
  const content = fs.readFileSync(pathToFile, 'utf-8')

  const wrapper = [
    '(function(require, module, exports, __dirname, __filename) {',
    '})'
  ]

  const wrappedContent = wrapper[0] + content + wrapper[1]

  const script = new vm.Script(wrappedContent, {
    filename: 'index.js'
  })
  const result = script.runInThisContext()

  const module = {
    exports: {}
  }
  result(r, module, module.exports)
  return module.exports
}

global.r = customeRequire