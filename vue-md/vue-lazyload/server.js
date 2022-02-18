const express = require('express')
const app = express()
app.use(express.static(__dirname))
app.listen(9528)
const arr = []
for (let i = 11; i <= 20; ++i) {
  arr.push(`http://localhost:9528/images/image${i}.bmp`)
}
app.get('/api/img', (req, res) => {
  res.json(arr)
})