<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
         <v-img
          class="white--text"
          height="200px"
          :src="require(`@/assets/articles/firepots.jpg`)"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{event.start_date}}</span><br>
                <span class="subheading">{{event.start_time}} </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span>{{event.groupname}}</span><br>
            <span class="grey--text">Member: {{event.username}}</span><br>
          </div>
        </v-card-title>
        <v-card-text>
          <div>
            <span class="grey--text">Info</span><br>
            <span>{{event.description}}</span>
          </div>
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
            :buttonView="event.clickable"
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