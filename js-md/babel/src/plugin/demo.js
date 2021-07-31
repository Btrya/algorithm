const { transformSync } = require('@babel/core')
const plugin = requrie('./index.js')

const code = `
  // 业务代码
`

const options = {
  plugin: ['./index.js'] // babel.config.js
}
const output = transformSync(code, options) // code就是实际业务传进来的代码块