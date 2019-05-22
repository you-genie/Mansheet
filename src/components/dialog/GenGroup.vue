<template>
  <v-layout row justify-center>
    <v-dialog 
      v-model="dialog"
      :dark="error ? true : false" 
      persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          small
          dark
          color="purple"
          title="Make Group"
          v-on="on"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Group</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="groupname" label="Group name*" required></v-text-field>
                </v-flex>
                <small>*indicates required field</small>
                <user-select v-model="entries"/>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submitGroup">Make</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {
    mapActions, mapState
  } from 'vuex'

  export default {
    name: 'GenGroup',
    components: {
      UserSelect: () => import('@/components/base/UserSelect')
    },
    data: () => ({
      entries: [],
      groupname: null,
      dialog: false,
      error: false
    }),
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['genGroup']),
      submitGroup () {
        this.dialog = false;
        this.entries.push(this.user);
        var payload = {
          "username" : this.user,
          "groupname" : this.groupname,
          "entries" : this.entries
        };
        this.genGroup(payload).catch(function (err) {
          this.dialog = true;
          this.error = true;
        })
      }
    }
  }
</script>