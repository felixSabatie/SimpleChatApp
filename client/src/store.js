import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  socket: IoClient('localhost:3000'),
  connected: false,
  chatrooms: []
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
  }
}

const actions = {
  connect(context) {
    context.commit('connect')
  },
  getChatroomsFromServer(context) {
    axios.get('http://localhost:3000/chatrooms').then(response => {
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
  }
}

const getters = {
  socket: state => state.socket,
  connected: state => state.connected,
  chatrooms: state => state.chatrooms
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
