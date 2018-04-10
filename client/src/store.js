import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  socket: IoClient('192.168.43.99:3000'),
  connected: false,
  chatrooms: [],
  user: null
}

const mutations = {
  connect(state) {
    state.connected = true
  },
  setChatrooms(state, chatrooms) {
    state.chatrooms = chatrooms
  },
  addChatroom(state, chatroom) {
    state.chatrooms.push(chatroom)
  },
  login(state, user) {
    state.user = user
  },
  newMessage(state, message) {
    let chatroom = state.chatrooms.find(room => room.id === message.chatroomId)
    if(chatroom != null) {
      chatroom.messages.push(message)
    }
  }
}

const actions = {
  connect(context) {
    context.commit('connect')
  },
  getChatroomsFromServer(context) {
    axios.get('http://192.168.43.99:3000/chatrooms').then(response => {
      context.commit('setChatrooms', response.data)
    }, err => {
      console.error(err)
    })
  },
  emitChatroom({commit, state}, chatroom) {
    state.socket.emit('newChatroom', chatroom)
  },
  addChatroom(context, chatroom) {
    context.commit('addChatroom', chatroom)
  },
  login({commit, state}, user) {
    state.socket.emit('login', user.name)
    this.dispatch('connect')
    commit('login', user)
  },
  newMessage(context, message) {
    context.commit('newMessage', message)
  }
}

const getters = {
  socket: state => state.socket,
  connected: state => state.connected,
  chatrooms: state => state.chatrooms,
  user: state => state.user
}

let store = new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})

// Socket.io events listener
store.state.socket.on('newChatroom', chatroom => {
  store.dispatch('addChatroom', chatroom)
})

store.state.socket.on('newMessage', message => {
  store.dispatch('newMessage', message)
})

export default store
