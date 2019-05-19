<template>
  <v-container fluid>
    <v-layout row align-left>
      <v-flex xs12>
        <v-select
          v-model="group"
          :items="groups"
          label="Select Group*"
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
        group: null,
        groups: [
        /* this data should be later fetched from thers*/
          'Paris', 'Ain\'t my fault', 'Little C', 'Me', 
          'Shuuuba', 'Groups'
        ]
      }
    }
  }
</script>