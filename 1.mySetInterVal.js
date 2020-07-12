/**
 * 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 * @param fn 传入执行函数
 * @param a 传入第一个时间
 * @param b 传入第二个时间
 */
function mySetInterVal(fn, a, b) {
  let _currentInterVal = null
  let _timesArr = [a, a + b, a + 2 * b]
  let _index = 0
  let _mySetInterVal = _t => {
    if (_index < _timesArr.length) {
      clearInterval(_currentInterVal)
      _currentInterVal = setInterval(() => {
        fn()
        _index ++
        _mySetInterVal(_timesArr[_index])
      }, _t);
      return _currentInterVal
    } else {
      _index = 0
      _mySetInterVal(_timesArr[_index])
    }
  }
  _mySetInterVal(_timesArr[_index])  // 启动开关
  return _currentInterVal
}

function myClear(interval) {
  clearInterval(interval)
}

let interval = mySetInterVal(() => {
  console.timeEnd('我的定时器')
  console.time('我的定时器')
}, 2000, 1000)
