<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
  <v-layout wrap>
    <v-container mx-auto>
      <p> 2019.05.19 Copyright reserved by Nakji </p>
    </v-container>
    <core-cta />
  </v-layout>
  </v-footer>
</template>

<script>
  export default {
    components: {
      CoreCta: () => import('@/components/core/Cta')
    }
  }
</script>
