## 解构 - 解开解构
```js
// 对象型
const asaki = {
  teacher: 'aaa',
  leader: 'bbb'
}

const teacher = asaki.teacher
const leader = asaki.leader;

// es6

const { teacher, leader } = asaki

// 数组
const arr = ['', '', '', '']
const a = arr[0]
const b = arr[1]

// es6
const [a, b, c, d] = arr
```

## 技巧key解构
```js
const asaki = {
  teacher: {
    name: 'aaa',
    age: 24,
  },
  leader: 'bbb',
  name: 'asaki'
}

// key 别名
const {
  teacher: {
    name: teacherName,
    age
  },
  leader,
  name
} = asaki
// teacherName, age, leader, name
```

### 问题 解构 使用场景/什么情况下使用过
```js
// 数组传参
const sum = arr => {
  let res = 0
  arr.forEach(each => {
    res += each
  })
}

// es6
const sum = ([a, b, c]) => {
  return  a + b + c
}
sum([1, 1, 1])
```

## 结合初始值
```js
const course = ({teacher, leader, course = 'ddd'}) => {
  // ...
}

course({
  teacher: 'aa',
  leader: 'bb',
  // course: 'ccc'
})
```

### 返回值
```js
const getCourse = () => {
  return {
    teacher: 'aa',
    leader: 'bb'
  }
}

const { teacher, leader } = getCourse()
```

### 变量交换
```js
let a = 1
let b = 2
[b, a] = [a, b]
```

### json 处理
```js
const json = '{"teacher": "aaa", "leader": "bbb"}'

const obj = JSON.parse(json)

const { teacher, leader } = obj
```

### ajax
```js
ajax.get(URL).then(res => {
  let code = res.code
  let data = res.data
  let msg = res.msg
})

// es6
ajax.get(URL).then(res => {
  let { code, data, msg } = res
})
```