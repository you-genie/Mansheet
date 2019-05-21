<template>
  <v-container fluid>
    <v-layout row align-left>
      <v-flex >
        <v-select
          v-model="entry"
          :items="usernames"
          label="Select Entry"
          multiple
          solo
          chips
          hint="Select Your Group's Entry"
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: "UserSelect",
    data () {
      return {
        entry: [],
      }
    },
    computed: {
      ...mapState(['users']),
      usernames () {
         const names = [];
         this.users.forEach(e => (names.push(e.username)))
         return names
      }
    }
  }
</script>