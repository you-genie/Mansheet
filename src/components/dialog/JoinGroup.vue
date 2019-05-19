<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-chip
          class="text-uppercase"
          color="primary"
          label
          dark
          small
          v-on="on"
        >
          Join
        </v-chip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Join {{value.name}}</span>
        </v-card-title>
        <v-card-text>
          Do you really want to join {{value.name}} group?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Yes</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    name: 'JoinGroup',
    data: () => ({
      dialog: false
    })
  }
</script>