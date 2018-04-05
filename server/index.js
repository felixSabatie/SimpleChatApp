const express = require('express')
let app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
  console.log('user connected')
})

http.listen(3000)