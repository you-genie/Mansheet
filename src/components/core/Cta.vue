<template>
    <v-speed-dial
      v-if="user"
      bottom
      fixed
      right
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn
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
        @click="signOut"
        title="Sign Out"
        rel="noopener"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <gen-group />
      <gen-schedule />
      <drop-out 
        v-if="groupInfo.owner == user"
        :value="groupInfo"/>
    </v-speed-dial>
</template>

<script>
  import {
    mapState, mapMutations
  } from 'vuex'

  export default {
    components: {
      GenGroup: ()=> import('@/components/dialog/GenGroup'),
      GenSchedule: ()=> import('@/components/dialog/GenSchedule'),
      DropOut: () => import('@/components/dialog/DropOut')
    },
    computed: {
      ...mapMutations(['signOut']),
      ...mapState(['user', 'groupInfo'])
    }
  }
</script>