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
    mapState,
    mapGetters
  } from 'vuex'

  export default {
    name: "SingleGroupSelect",
    props: {
      group: String
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({base: 'groups'}),
      ...mapGetters({groups: 'validGroupnames'})
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