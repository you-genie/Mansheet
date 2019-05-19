import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar_demo.vue'
import Signup from './views/SignUp.vue'
import Signin from './views/SignIn.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    	path: '/calendar',
    	name: 'calendar',
    	component: Calendar
    },
    {
    	path: '/signup',
    	name: 'signup',
    	component: Signup
    },
    {
    	path: '/signin',
    	name: 'signin',
    	component: Signin
    }
  ]
})
