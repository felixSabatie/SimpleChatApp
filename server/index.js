const express = require('express')
let app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let chatrooms = []
let clients = []
let nextChatroomId = 1

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

io.on('connection', socket => {
  console.log('user connected')
  let userName = null

  socket.on('disconnect', () => {
    console.log('user (' + userName + ') disconnected')
  })

  socket.on('login', name => {
    console.log(name + ' logged in')
    clients[name] = socket
    userName = name
  })

  socket.on('newChatroom', chatroom => {
    console.log('new chatroom : ' + chatroom.name)
    if(chatrooms.find(room => room.name === chatroom.name) == null) {
      chatroom.id = nextChatroomId
      chatrooms.push(chatroom)
      io.sockets.emit('newChatroom', chatroom)
      nextChatroomId ++
    } else {
      console.warn('chatroom ' + chatroom.name + ' rejected, key already exists')
    }
  })

  socket.on('roomConnect', roomId => {
    console.log(userName + ' connected to room ' + roomId)
  })

  socket.on('messageSent', message => {
    console.log('message received : ' + message)
    io.sockets.emit('newMessage', message)
  })

})

app.get('/chatrooms', (req, res) => {
  res.json(chatrooms)
})

http.listen(3000)