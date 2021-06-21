import React from "react";
import ReactDom from "react-dom";

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Btrya')
  const onClick = () => {
    setCount(count + 1)
  }
  const onClickName = () => {
    setName(`${name} ${Math.random()}`)
  }
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>点击修改count</button>
      <div>{name}</div>
      <button onClick={onClickName}>点击修改name</button>
    </div>
  )
}

let stateArray: any[] = []
let cursor = 0

function useState<T>(initialState: T): [T, (newState: T) => void] {
  const currentCursot = cursor
  stateArray[currentCursot] = stateArray[currentCursot] || initialState

  function setState(newState: T) {
    stateArray[currentCursot] = newState
    render()
  }
  ++cursor
  return [stateArray[currentCursot], setState]
}

export function render() {
  ReactDom.render(
    <React.StricMode>
      <Counter />
    </React.StricMode>,
    document.getElementById("root")
  )
  // TODO
  cursor = 0
}