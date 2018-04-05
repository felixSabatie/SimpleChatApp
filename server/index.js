const express = require('express')
const io = require('socket.io')

let app = express()

io.on('connection', socket => {
  console.log('user connected')
})

app.listen(3000)