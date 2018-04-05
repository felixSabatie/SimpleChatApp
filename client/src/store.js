import Vue from 'vue'
import Vuex from 'vuex'
import IoClient from 'socket.io-client'

Vue.use(Vuex)

const state = {
  io: IoClient.connect('localhost:3000')
}

const mutations = {

}

export default new Vuex.Store({
  state: state,
  mutations: mutations
})
