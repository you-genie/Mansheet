<template>
  <div id="home">
    <banner />
    
    <about />

  </div>
</template>

<script>
  import {
    mapState, mapActions
  } from 'vuex'

  export default {
    name: 'Home',

    components: {
      About: () => import('@/components/home/About'),
      Banner: () => import('@/components/home/Banner'),
    },
    computed: {
      ...mapState(['user', 'password', 'groups'])
    },
    methods: {
      ...mapActions(['getMyGroups', 'getAllUsers', 'getAllGroups'])
    },
    watch: {
      groups: function(value) {
        console.log(value)
        if (value != null) {
          this.$router.push({name: 'calendar', params: {group: "all"}});
        }
      }
    },
    mounted () {
      if (this.user != null && this.password != null) {
        this.$router.push('calendar/all');
      }
    }
  }
</script>
