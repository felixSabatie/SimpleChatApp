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

  socket.on('messageSent', message => {
    console.log('message received : ' + message.content)
    chatroom = getChatroomById(message.chatroomId)
    if(chatroom != null) {
      chatroom.messages.push(message)
      io.sockets.emit('newMessage', message)
    }
  })

})

function getChatroomById(chatroomId) {
  return chatrooms.find(room => room.id === chatroomId)
}

app.get('/chatrooms', (req, res) => {
  res.json(chatrooms)
})

app.get('/chatrooms/:id', (req, res) => {
  let chatroom = getChatroomById(parseInt(req.params.id))
  if(chatroom == null) {
    res.status(404).send('Resource not found')
  } else {
    res.json(chatroom)
  }
})

http.listen(3000)