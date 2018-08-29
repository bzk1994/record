// const str = '掌门一对一'

// const buffer = new Buffer(str)

// console.log(buffer)

// console.log(buffer.toString())

const fs = require('fs')
let data = ''
let rs = fs.createReadStream('./read.md')

rs.on('data', chunk => {
  data += chunk
})

rs.on('end', () => {
  console.log(data)
})