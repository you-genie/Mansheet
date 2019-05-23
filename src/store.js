import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import {axiosPostHeader, axiosPatchHeader, axiosGetHeader} from './store/helper'

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    password: null,
    db: 'https://mansheet.run.goorm.io',
    pictures: require('@/data/heros.json'),
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
    },
    setDummyGroup (state, payload) {
      state.groups.push(payload);
    }
  },
  actions: {
    fetchUserData (context) {
      if (context.state.user == null 
        || context.state.password == null) {
        router.push('/');
      }
    },
    setUserInfo (context, payload) {
      context.commit('setUser', payload.username);
      context.commit('setPassword', payload.password); 
    },
    setDummyUserInfo (context, payload) {
      context.commit('setUser', payload.username);
      context.commit('setPassword', payload.password); 
      context.commit('setDummyUser', payload);
    },
    signUp (context, payload) {
      var header = axiosPostHeader(
        context.state.db + '/user', {
          "username": payload.username,
          "password": payload.password
        });

      axios.request(header).then(function (res) {
        context.dispatch('setDummyUserInfo', payload).then(
          () => {
            console.log(res);
            router.push('calendar/' + payload.username);
          });
      }).catch(function (err) {
        console.log(payload);
        console.log(err);
      });
    },
    signIn (context, payload) {
      var header = axiosPatchHeader(
        context.state.db + '/user', {
          "username": payload.username,
          "password": payload.password
      });
      axios.request(header).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          context.dispatch('setDummyUserInfo', payload).then(
            () => {
              console.log(res);
              router.push('calendar/' + payload.username);
            });
        } else {
          console.log("error");
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    genGroup (context, payload) {
      var header = axiosPostHeader(
        context.state.db + '/group', payload
      );
      axios.request(header).then(function (res) {
        if (res.status == 201) {
          /* later add logic of adding group (in toolbar) 
          - so in dataset of group. */
          router.push('calendar/' + payload.groupname);
        }
      }).catch(function (err) {
        console.log(err);
        console.log(payload);
      })
    }
  }
})
