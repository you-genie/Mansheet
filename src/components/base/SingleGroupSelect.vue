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
  export default {
    name: "SingleGroupSelect",
    data () {
      return {
        groups: [
        /* this data should be later fetched from thers*/
          'Paris', 'Ain\'t my fault', 'Little C', 'Me', 
          'Shuuuba', 'Groups'
        ]
      }
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