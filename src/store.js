import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import {axiosPostHeader, axiosPatchHeader, axiosGetHeader, axiosDelHeader} from './store/helper'

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    password: null,
    fetch: false,
    db: 'https://mansheet.run.goorm.io',
    pictures: require('@/data/heros.json'),
    users: require('@/data/users.json'),
    articles: require('@/data/articles.json'),
    schedules: require ('@/data/schedules.json'),
    groups: require ('@/data/groups.json'),
    notJoinedGroups: require ('@/data/groups.json'),
    drawer: false,
    groupInfo: {
      groupname: null,
      owner: null,
      groupid: null,
      entries: []
    },
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
    validGroupnames: state => {
      const group_names = []

      for (const g of state.groups) {
        if (g.ownername != state.user) continue
        if (
          !g.groupname ||
          group_names.find(group => group.text === g.groupname) 
        ) continue

        const text = g.groupname

        group_names.push(text)
      }

      console.log(group_names)
      return group_names.sort()
    },
    groupnames: state => {
      const group_names = []

      for (const g of state.groups) {
        if (
          !g.groupname ||
          group_names.find(group => group.text === g.groupname)
        ) continue

        const text = g.groupname

        group_names.push({
          text,
          to: `/calendar/${text}`
        })
      }

      return group_names.sort()
    },
    links: (state, getters) => {
      return state.items.concat(getters.groupnames)
    },
    groupEntrySize: state => {
      const len = state.groupInfo.entries.length + 1;
      return 1 / len + 0.2;
    }
  },
  mutations: {
    signOut (state) {
      state.user = null
      state.password = null
    },
    setUsers: (state, payload) => (state.users = payload),
    setFetch: (state, payload) => (state.fetch = payload),
    setGroups: (state, payload) => (state.groups = payload),
    setNotJoinedGroups: (state, payload) => (state.notJoinedGroups = payload),
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
    },
    setGroupInfo: (state, payload) => (state.groupInfo = payload),
    setSchedules: (state, payload) => (state.schedules = payload)
  },
  actions: {
    fetchUserData (context) {
      if (context.state.user == null 
        || context.state.password == null) {
        router.push('/');
      }
    },
    setUserInfo (context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('setUser', payload.username);
          context.commit('setPassword', payload.password);
          resolve(payload.username)
        }, 1000)
      })
    },
    setDummyUserInfo (context, payload) {
      context.commit('setUser', payload.username);
      context.commit('setPassword', payload.password); 
      context.commit('setDummyUser', payload);
    },
    getAllUsers (context, payload) {
      var header = axiosPatchHeader (
        context.state.db + '/allusers', payload);
      axios.request(header).then(function(res) {
        context.commit('setUsers', res.data);
      })
    },
    joinGroup (context, payload) {
      var header = axiosPostHeader (
        context.state.db + '/join', payload);
      axios.request(header).then(function(res) {
        context.dispatch('getMyGroups');
        context.dispatch('getAllGroups');
      })
    },
    dropGroup (context, payload) {
      var header = axiosDelHeader (
        context.state.db + '/group', payload);
      axios.request(header).then(function(res) {
        context.dispatch('getMyGroups');
        context.dispatch('getAllGroups');
      })
    },
    signUp (context, payload) {
      var header = axiosPostHeader(
        context.state.db + '/user', {
          "username": payload.username,
          "password": payload.password
        });

      axios.request(header).then(function (res) {
        context.dispatch('setUserInfo', payload).then(
          (username) => {
            console.log(res);
            router.push({name: 'home'});
          });
      }).catch(function (err) {
        console.log(payload);
        alert("이미 있는 이름이지롱")
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
          context.dispatch('setUserInfo', payload).then(
            (username) => {
              context.dispatch('getAllUsers',{"username": username})
              context.dispatch('getAllGroups', {
                "username": username
              }).then( () => {
                context.dispatch('getMyGroups', {
                  "username": username
                }).then(() => {
                  console.log("GO PLEASE")
                })
              })
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
          context.dispatch('getMyGroups').then(function() {
            context.dispatch('getAllGroups');
            router.push({name: 'calendar', params: {group: payload.groupname}});
          })
        }
      }).catch(function (err) {
        console.log(err);
        console.log(payload);
        alert(err)
      })
    },
    getMyGroups (context, payload) {
      console.log('Get My Grouops')
      var header = null
      if (payload == null) {
        header = axiosPostHeader(
          context.state.db + "/allgroups", {"username": context.state.user}
        );        
      } else {
        header = axiosPostHeader(
          context.state.db + "/allgroups", payload)
      }
      axios.request(header).then(function(res) {
        if (res.status != 200) {
          console.log(res)
        }
        context.commit('setGroups', res.data);
      }).catch(function(err) {
        console.log(err);
        console.log(context.state.user)
      })
    },
    getAllGroups (context, payload) {
      console.log('Get ALl Grouops')
      var header = null
      if (payload == null) {
        header = axiosPatchHeader(
          context.state.db + "/allgroups", {"username": context.state.user}
        );        
      } else {
        header = axiosPatchHeader(
          context.state.db + "/allgroups", payload)
      }
      axios.request(header).then(function(res) {
        if (res.status != 200) {
          console.log(res);
        }
        context.commit('setNotJoinedGroups', res.data);
      }).catch(function(err) {
        console.log(context.state.user)
      })
    },
    postSchedule (context, payload) {
      var header = axiosPostHeader(
        context.state.db + '/schedule', payload);
      axios.request(header).then(function(res) {
        if (res.status != 201) {
          alert("wrong!");
          console.log(res);
        }
        if (context.state.groupInfo.groupid == -1) {
          context.dispatch('getAllSchedules')
        } else {
          context.dispatch('getSchedule', {
            "groupname": context.state.groupInfo.groupname,
            "username": context.state.user
          });          
        }

      }).catch(function(err) {
        console.log(err);
        console.log(payload);
      })
    },
    editSchedule (context, payload) {
      var header = axiosPatchHeader(
        context.state.db + '/schedule', payload);
      axios.request(header).then(function(res) {
        if (res.status != 201 ) {
          alert("wrong!!!");
          console.log(res);
        }
        context.dispatch('getSchedule', {
          "groupname": context.state.groupInfo.groupname,
          "username": context.state.user
        });
      }).catch(function(err) {
        console.log(err);
        console.log(payload);
      })      
    },
    deleteSchedule (context, payload) {
      var header = axiosDelHeader(
        context.state.db + '/schedule', payload);
      axios.request(header).then(function(res) {
        if (res.status != 201) {
          alert("wrong! del");
          console.log(res);
        }
        context.dispatch('getSchedule', {
          "groupname": context.state.groupInfo.groupname,
          "username": context.state.user
        });
      }).catch(function(err) {
        console.log(err);
        console.log(payload);
      })  
    },
    getSchedule (context, payload) {
      var header = axiosPatchHeader(
        context.state.db + '/group', payload);
      axios.request(header).then(function(res) {
        if (res.status != 201) {
        }
        console.log(res);
        const data = res.data
        /* do actions for getting schedule */
        context.commit('setSchedules', data.schedules);
        context.commit('setGroupInfo', {
          groupname: data.groupname, 
          groupid: data.groupid,
          owner: data.ownername,
          entries: data.entries
        });
        console.log(context.state.groupInfo)
        console.log(context.getters.groupEntrySize)
        context.commit('setFetch', false);
      }).catch(function(err) {
        console.log(err);
        console.log(payload);
        context.commit('setSchedules', []);
      })
    },
    getAllSchedules (context) {
      var header = axiosPatchHeader(
        context.state.db + '/allschedules');
      axios.request(header).then(function(res) {
        const data = res.data
        context.commit('setSchedules', data);
        context.commit('setGroupInfo', {
          groupname: "all", 
          groupid: -1,
          owner: null,
          entries: []
        });
      })
    }
  }
})
