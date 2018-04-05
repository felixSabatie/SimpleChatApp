import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'

Vue.use(Vuex)

const state = {
  socket: IoClient('localhost:3000')
}

const mutations = {}

const actions = {}

const getters = {
  socket: state => state.socket
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
