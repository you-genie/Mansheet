<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          small
          dark
          color="amber darken-1"
          title="Drop Out"
          v-on="on"
        >
          <v-icon>mdi-account-minus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Drop Out {{value.groupname}}</span>
        </v-card-title>
        <v-card-text>
          Do you really want to drop {{value.groupname}} group?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="value.owner == user ? del() : drop()">Yes</v-btn>
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
      owner: Boolean,
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapState(['user']),
    },
    name: 'DropGroup',
    data: () => ({
      dialog: false
    }),
    methods: {
      ...mapActions(['deleteGroup', 'dropGroup']),
      del () {
        var payload = {
          "groupname": this.value.groupname,
          "username": this.user
        }
        this.deleteGroup(payload);
        this.$router.push({name: 'home'});
        this.dialog = false;
      },
      drop () {
        var payload = {
          "groupname": this.value.groupname,
          "username": this.user
        }
        this.dropGroup(payload);
        this.$router.push({name: 'home'});
        this.dialog = false;
      }
    }
  }
</script>