<template>
  <v-app>
    <core-toolbar />

    <core-drawer />

    <core-view />

    <core-footer />

  </v-app>
</template>

<script>
  import {
    mapState, mapActions
  } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapState(['user', 'password', 'groups'])
    },
    methods: {
      ...mapActions(['getMyGroups', 'getAllUsers', 'getAllGroups'])
    },
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreToolbar: () => import('@/components/core/Toolbar'),
      CoreView: () => import('@/components/core/View')
    },
    watch: {
      user: function(value) {
        console.log("change this!: " + value)
        if (value != null || value != "id") {
          this.getMyGroups()
          this.getAllUsers({"username": value})
          this.getAllGroups()
        } else {
          this.$router.push('/')
        }
      }
    },
    data () {
      return {
      //
      }
    }
  }
</script>
