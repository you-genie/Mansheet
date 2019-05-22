<template>
  <div id="home">
    <banner />
    
    <about />

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Home',

    components: {
      About: () => import('@/components/home/About'),
      Banner: () => import('@/components/home/Banner'),
    },
    computed: {
      ...mapState(['user', 'password'])
    },
    mounted () {
      if (this.user != null && this.password != null) {
        this.$router.push('calendar/all');
      }
    }
  }
</script>
