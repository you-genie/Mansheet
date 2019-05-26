<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="300px">
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
          <span class="headline">Join {{value.groupname}}</span>
        </v-card-title>
        <v-card-text>
          Do you really want to join {{value.groupname}} group?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="join">Yes</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {
    mapState, mapActions
  } from 'vuex'

  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapState(['user']),
    },
    name: 'JoinGroup',
    data: () => ({
      dialog: false
    }),
    methods: {
      ...mapActions(['joinGroup']),
      join () {
        var payload = {
          "groupname": this.value.groupname,
          "username": this.user
        }
        this.joinGroup(payload);
        this.dialog = false;
      }
    }
  }
</script>