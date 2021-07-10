/**
 * XMLHttpRequest
 */
const xhr = new XMLHttpRequest()

xhr.open('GET', 'http://domain/service')

xhr.onreadystatechange = function() {
  if (xhr.readyState !== 4) return
  if (xhr.status === 200) {
    // do something
    console.log(xhr.responseText)
  } else {
    console.error(`HTTP error, status = ${xhr.status}, errorText = ${xhr.statusText}`)
  }
}

xhr.timeout = 3000

xhr.ontimeout = () => {
  console.log(`当前请求超时了`)
}

xhr.upload.onprogress = p => {
  const percent = Math.round(p.loaded / p.total * 100) + '%'
  console.log(`当前文件上传进度为：${percent}`)
}

xhr.send()



/**
 * fetch
 */
fetch('http://domain/service', {
  method: 'GET',
  credentials: 'same-origin', // 同一个请求携带cookie 
}).then(res => {
  if (res.ok) { // ok属性才是真的请求成功
    // 请求成功
    return res.json()
  }
  throw new Error('http error')
}).then(json => {
  console.log(json)
}).catch(error => { // 这里catch的是整体的error 不一定是请求失败的错误，还有里边处理的错误
  console.error(error)
})

// fetch本身不支持设置超时,自己封装一个
function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(resolve).catch(reject) // 100ms
    setTimeout(reject, timeout);
  })
}

// 课后作业
// 尝试一下 封装一个通用的异步函数的超时逻辑 ajax.ts

function xx(fn, timeout) {

}

// 中断fetch请求
const controller = new AbortController() 

fetch('http://domain/service', {
  method: 'GET',
  credentials: 'same-origin', // 同一个请求携带cookie 
  signal: controller.signal
}).then(res => {
  if (res.ok) { // ok属性才是真的请求成功
    // 请求成功
    return res.json()
  }
  throw new Error('http error')
}).then(json => {
  console.log(json)
}).catch(error => { // 这里catch的是整体的error 不一定是请求失败的错误，还有里边处理的错误
  console.error(error)
})

controller.abort()