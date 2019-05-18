<template>
  <div id="home">
    <banner />
    
    <about />

  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      About: () => import('@/components/home/About'),
      Banner: () => import('@/components/home/Banner'),
    }
  }
</script>
