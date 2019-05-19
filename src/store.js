import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    schedules: require ('@/data/schedules.json'),
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
    groups: state => {
      const groups = []

      for (const schedule of state.schedules) {
        if (
          !schedule.group ||
          groups.find(group => group.text === schedule.group)
        ) continue

        const text = schedule.group

      /* implement this part later */
        // groups.push({
        //   text,
        //   to: `/group/${text}`
        // })

        groups.push({
          text,
          to: `/calendar`
        })
      }

      return groups.sort().slice(0, 4)
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
      return state.items.concat(getters.groups)
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  }
})
