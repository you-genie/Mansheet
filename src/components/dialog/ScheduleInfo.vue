<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Schedule Info</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-subheader>Owner</v-subheader>
                  <v-layout row justify-space-around>
                    <div>group: {{event.groupname}}</div>
                    <div>user: {{event.username}}</div>
                  </v-layout>
                <v-subheader>Time</v-subheader>
                <v-layout row justify-space-around>
                  <div>date: {{event.start_date}}</div>
                  <div>time: {{event.start_time}}</div>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-subheader>Info</v-subheader>
                <p>{{ event.description }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn 
            v-if="event.clickable"
            color="deep-purple darken-2" 
            flat 
            @click="deleteAndClose"
          >
            Delete
          </v-btn>
          <edit-schedule
            v-if="event.clickable"
            :event="event"
            :close="close"
            v-model="close"
          ></edit-schedule>
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
    name: 'ScheduleInfo',
    components: {
      SingleGroupSelect: () => import('@/components/base/SingleGroupSelect'),
      EditSchedule: () => import('@/components/dialog/EditSchedule')
    },
    data: () => ({
      dialog: false,
      duration: "60",
      info: null,
      group: null,
      dateFormatted: null,
      date: null,
      time: null,
      close: false
    }),
    props: {
      toggle: Boolean,
      event: Object
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      close (val) {
        this.dialog = true
      },
      toggle (val) {
        this.dialog = true
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['deleteSchedule']),
      deleteAndClose () {
        var payload = {
          "sid": this.event.sid
        }
        this.deleteSchedule(payload).then(() => (this.dialot = false)).catch(function(err) {
          alert("error")
        })
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>