<template>
  <v-container fluid>
    <v-layout row align-left>
      <v-flex >
        <v-select
          :items="usernames"
          label="Select Entry"
          multiple
          solo
          chips
          return-objects
          item-value="username"
          hint="Select Your Group's Entry"
          persistent-hint
          @change="sendData"
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
    computed: {
      ...mapState(['users', 'user']),
      usernames () {
         const names = [];
         this.users.forEach(e => {
            if (e.username != this.user) {
              names.push(e.username);
              console.log(e.username);
            }
          });
         return names
      }
    },
    model: {
      value: 'entries',
      event: 'change'
    },
    methods: {
      sendData (event) {
        this.$emit('change', event);
      }
    }
  }
</script>