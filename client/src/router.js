import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from './components/Login'
import Home from './components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/', redirect: '/login' }
]

export default new VueRouter({ routes: routes, mode: 'history' })
