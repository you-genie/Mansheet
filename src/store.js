import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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

      /* implement this part later */
        // groups.push({
        //   text,
        //   to: `/group/${text}`
        // })

        group_names.push({
          text,
          to: `/calendar`
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
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  }
})
