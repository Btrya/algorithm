import React, { useState } from "react";
import ReactDom from "react-dom";

function CounterEffect() {
  effectCursor = 0
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)

  useEffect(() => {
    console.log(`count 发生了改变！！ ${count}`)
  }, [count])

  useEffect(() => {
    console.log(`count1 发生了改变！！ ${count1}`)
  }, [count1])

  const onClick = () => {
    setCount(count + 1)
  }
  const onClick1 = () => {
    setCount1(count1 + 1)
  }
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>点击修改count</button>
      <div>{count1}</div>
      <button onClick={onClick1}>点击修改count1</button>
    </div>
  )
}

const allDeps:Array<any[] | undefined> = [] // 二维数组
let effectCursor: number = 0
function useEffect(callback: () => void, depArray?: any) {
  if (!depArray) {
    callback()
    allDeps[effectCursor] = depArray
    effectCursor++
    return
  }
  const deps = allDeps[effectCursor]
  const hasChange = deps ? depArray.some((el, i) => el !== deps[i]) : true
  if (hasChange) {
    callback()
    allDeps[effectCursor] = depArray
  }
  effectCursor++
}

export function render() {
  ReactDom.render(
    <React.StricMode>
      <CounterEffect />
    </React.StricMode>,
    document.getElementById("root")
  )
  // TODO
}