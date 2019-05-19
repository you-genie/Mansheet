<template>
    <v-speed-dial
      v-model="fab"
      bottom
      fixed
      right
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon>mdi-chevron-up</v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        small
        color="blue"
        href="/"
        title="Sign Out"
        rel="noopener"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <gen-group />
      <gen-schedule />s
    </v-speed-dial>
</template>

<script>
  export default {
    components: {
      GenGroup: ()=> import('@/views/GenGroup'),
      GenSchedule: ()=> import('@/views/GenSchedule')
    }
  }
</script>