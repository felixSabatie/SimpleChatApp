import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'

Vue.use(Vuex)

const state = {
  socket: IoClient('localhost:3000'),
  connected: false
}

const mutations = {
  connect(state) {
    state.connected = true
  }
}

const actions = {
  connect(context) {
    context.commit('connect')
  }
}

const getters = {
  socket: state => state.socket,
  connected: state => state.connected
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
