import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import Signup from './views/SignUp.vue'
import Groups from './views/Groups.vue'

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
    	path: '/calendar/:group',
    	name: 'calendar',
    	component: Calendar
    },
    {
    	path: '/signup',
    	name: 'signup',
    	component: Signup
    },
    {
    	path: '/groups',
    	name: 'groups',
    	component: Groups
    }
  ]
})
