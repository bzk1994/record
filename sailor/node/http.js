const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' })
  console.log(res.headers.cookie)
  res.end('La La La')
}).listen('9528')

console.log('Server running')