const express = require('express')
let app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('roomConnect', roomId => {
    console.log('user connected to room ' + roomId)
  })
})

http.listen(3000)