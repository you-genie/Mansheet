import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "nakji",
    password: "1234",
    db: 'https://mansheet.run.goorm.io',
    users: require('@/data/users.json'),
    articles: require('@/data/articles.json'),
    schedules: require ('@/data/schedules.json'),
    groups: require ('@/data/groups.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        to: '/'
      },
      {
        text: 'Groups',
        to: '/groups'
      }
    ]
  },
  getters: {
    group_names: state => {
      const group_names = []

      for (const group of state.groups) {
        if (
          !group.name ||
          group_names.find(group => group.text === group.name)
        ) continue

        const text = group.name

        group_names.push({
          text,
          to: `/calendar/${text}`
        })
      }

      return group_names.sort().slice(0, 4)
    },
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.group_names)
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    setUser: (state, payload) => (state.user = payload),
    setPassword: (state, payload) => (state.password = payload),
    setDummyUser (state, payload) {
      state.users.push({
        username: payload.username,
        password: payload.password
      });
    }
  },
  actions: {
    fetchUserData (context) {
      if (context.state.user == null 
        || context.state.password == null) {
        router.push('/signup');
      }
    },
    signUp (context, payload) {
      axios.request({
        method: 'post',
        url: context.state.db + '/user',
        data: {
          "username": payload.username,
          "password": payload.password
        },
        withCredentials: false
      }).then(function (res) {
        context.commit('setUser', payload.username);
        context.commit('setPassword', payload.password);
        
        /* this should be deleted after */
        context.commit('setDummyUser', payload);
        console.log(res);
      }).catch(function (err) {
        console.log(payload);
        console.log(err);
        router.push('/signup');
      });
    },
    signIn (context, payload) {
      var base = { "username": payload.username, "password": payload.password};

      axios.request({
        method: 'get',
        url: context.state.db + '/user',
        data: base
      }).then(function (res) {
        console.log(context.state.db)

        context.commit('setUser', payload.username);
        context.commit('setPassword', payload.password);
        
        /* this should be deleted after */
        console.log(res);
      }).catch(function (err) {
        console.log(context.state.db)
        console.log(base);
        console.log(err);
        router.push('/');
      });
    }
  }
})
