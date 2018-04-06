import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from './components/Login'
import Chatrooms from './components/Chatrooms'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/chatrooms', component: Chatrooms },
  { path: '/chatrooms/:id', component: Chatrooms },
  { path: '/', redirect: '/login' }
]

export default new VueRouter({ routes: routes, mode: 'history' })
