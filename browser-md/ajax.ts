/**
 * 封装一个ajax.ts
 */
interface IOptions {
  url: String;
  type?: 'GET' | 'POST';
  data: any;
  timeout?: number;
}

function formatUrl(object) {
  // a=xxx&b=xxx; querystring
  let dataArr = []
  for (let key in object) {
    dataArr.push(`${key}=${encodeURIComponent(object[key])}`) // https://xxx?xxx
  }
  return dataArr.join('&')
}

export function ajax(
  options: IOptions = {
    type: "GET",
    data: {},
    timeout: 3000,
    url: ""
  }
) {
  return new Promise((resolve, reject) => {
    if (!options.url) return // 防止绕过类型判断 比如ajax({} as any)这样去调用

    const querystring = formatUrl(options.data)

    const onStateChange = () => {
      xhr.onreadystatechange = () => {
        if (xhr.reaadyState === 4) {
          clearTimeout(timer)
          if (xhr.status >= 200 && xhr.status < 300 || xhr.statuc === 304) {
            resolve(xhr.responseText)
          } else {
            reject(xhr.status)
          }
        }
      }
    }
    let timer
    let xhr

    if ((window as any).XMLHTPPRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    if (options.type.toUpperCase() === 'GET') {
      xhr.open('GET', `${options.url}?${querystring}`)
      onStateChange()
      xhr.send()
    } else if (options.type.toUpperCase() === 'POST') {
      xhr.open('POST', options.url)
      xhr.setRequestHeader(
        'ContentType', 
        'application/x-www-form-urlencoded'
      )
      onStateChange()
      xhr.send(options.data)
    }

    if (options.timeout) {
      timer = setTimeout(() => {
        xhr.abort()
        reject('timeout')
      }, options.timeout)
    }
  })
}