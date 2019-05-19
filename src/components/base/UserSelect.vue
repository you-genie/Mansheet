<template>
  <v-container fluid>
    <v-layout row align-left>
      <v-flex xs12>
        <v-select
          v-model="entry"
          :items="users"
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
  export default {
    name: "UserSelect",
    data () {
      return {
        entry: [],
        users: [
        /* this data should be later fetched from thers*/
          'Shasha', 'Nakji', 'Ari', 'Jonna',
          'Dongdong', 'Choco', 'Jobs', 'Rme',
          'Ggomi', 'Ddeori', 'Mogi', 'Bm', 
          'Ddolchi', 'Bugi', 'Dalo', 'Nalchi'
        ]
      }
    }
  }
</script>