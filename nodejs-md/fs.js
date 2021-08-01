const fs = require('fs')

const path = require('path')

const pathToFile = path.resolve(__dirname, './text')

// error first
fs.readFile(pathToFile, 'utf-8', function(err, result) {
  if (err) {
    console.log('error', err)
    return err
  }
  console.log('result', result)
})

const content = fs.readFileSync(pathToFile, 'utf-8')
console.log('sync content', content)

function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push(function(err, result) {
        if (err) return reject(err)
        return resolve(result)
      })
      return func.apply(func, args)
    })
  }
}

const readFileAsync = promisify(fs.readFile)
readFileAsync(pathToFile, 'utf-8').then(content => {
  console.log(content)
}).catch(err => {
  console.log('error', err)
})