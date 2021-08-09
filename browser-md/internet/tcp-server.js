const net = require('net')

const HOST = '127.0.0.1'
const PORT = 7777

// 创建一个 TCP 服务器实例，调用 listen 函数监听指定端口和 ip
// net.createServer 又一个参数，是监听连接建立的回调
net.createServer((socket) => {
  const remoteName = `${socket.remoteAddress}: ${socket.remotePort}`

  console.log(`${remoteName} 连接到本服务器`)

  // 接收数据
  socket.on('data', (data) => {
    console.log(`${remoteName} - ${data}`)
    // 给客户端发消息
    socket.write(`马什么冬梅啊？是说的${data}吗？`)
  })

  // 关闭
  socket.on('close', (data) => {
    console.log(`${remoteName} 连接关闭`)
  })

}).listen(PORT, HOST)

console.log(`Server listening on ${HOST}:${PORT}`)