<template>
  <v-container fluid>
    <v-layout row align-left>
      <v-flex xs12>
        <v-select
          :items="groups"
          label="Select Group*"
          @change="sendData"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "SingleGroupSelect",
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({groups: 'groupnames'})
    },
    model: {
      value: 'group',
      event: 'change'
    },
    methods: {
      sendData (event) {
        console.log(event)
        this.$emit('change', event);
      }
    }
  }
</script>