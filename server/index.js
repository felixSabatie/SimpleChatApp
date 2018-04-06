const express = require('express')
let app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let chatrooms = []
let clients = []

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    if(!(chatroom.name in chatrooms)) {
      chatrooms[chatroom.name] = chatroom
      io.sockets.emit('newChatroom', chatroom)
    } else {
      console.log('chatroom rejected')
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
  res.send(chatrooms)
})

http.listen(3000)