import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'

Vue.use(Vuex)

const state = {
  io: IoClient('localhost:3000')
}

const mutations = {}

const actions = {}

const getters = {
  io: state => state.io
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
