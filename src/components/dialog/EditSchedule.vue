<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          flat
          @click="sendData"
          color="#ff6f00"
          title="Edit Schedule"
          v-on="on"
        >
        Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Schedule</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs11>
                <v-flex xs12>
                  <v-subheader>Time</v-subheader>
                </v-flex>
                 <v-flex xs12 lg6>
                  <v-menu
                    ref="date_menu"
                    v-model="date_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        :rules="[rules.required]"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar-range"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="date_menu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-menu
                  ref="time_menu"
                  v-model="time_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      :rules="[rules.required]"
                      label="Time Picker"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="time_menu"
                    v-model="time"
                    full-width
                    @click:minute="$refs.time_menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                <v-text-field
                  v-model="duration"
                  :rules="[rules.required, rules.positive]"
                  prepend-icon="mdi-timelapse"
                  type="number"
                  label="duration" />
              </v-flex>
              <v-flex xs12>
                <v-subheader>Group</v-subheader>
              </v-flex>
              <single-group-select 
                v-model="group"
                :group="group"/>
              <v-flex xs12>
                <v-subheader>Info</v-subheader>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  color="primary"
                >
                  <template v-slot:label>
                    <div>
                      <small>locations, etc (optional)</small>
                    </div>
                  </template>
                </v-textarea>
              </v-flex>
              <small>*indicates required field</small>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="scheduleSubmit">Submit</v-btn>
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
    name: 'EditSchedule',
    components: {
      SingleGroupSelect: () => import('@/components/base/SingleGroupSelect')
    },
    data: () => ({
      date: null,
      time: null,
      group: null,
      sid: null,
      description: null,
      duration: null,
      dialog: false,
      time_menu: false,
      date_menu: false,
      dateFormatted: null,
      rules: {
        required: value => !!value || 'Required.',
        positive: v => v > 0 || 'Should be larger than 0'
      }
    }),
    mounted () {
      this.dateFormatted = this.formatDate(this.date)
      this.date = this.event.start_date
      this.time = this.event.start_time
      this.group = this.event.groupname
      this.sid = this.event.sid
      this.description = this.event.description
      this.duration = this.event.duration
    },
    props: {
      event: Object,
      close: Boolean,
      buttonView: Boolean
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    computed: {
      ...mapState(['user'])
    },
    model: {
      value: 'close',
      event: 'click'
    },
    methods: {
      ...mapActions(['editSchedule']),
      sendData (event) {
        this.dateFormatted = this.formatDate(this.date)
        this.date = this.event.start_date
        this.time = this.event.start_time
        this.group = this.event.groupname
        this.sid = this.event.sid
        this.description = this.event.description
        this.duration = this.event.duration
        this.$emit('click', !this.close)
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
      },
      scheduleSubmit () {
        if (this.group == null || this.user == null || this.date == null || this.time == null || this.duration == "") {
          alert ("you should fill in! required field");
          return;
        }
        var payload = {
          "sid": this.sid,
          "groupname": this.group,
          "username": this.user,
          "start_date": this.date,
          "start_time": this.time,
          "duration": this.duration,
          "description": this.description
        }
        this.editSchedule(payload).then(() => (this.dialog = false)).catch(function(err) {
          alert("error!");
        })
      }
    }
  }
</script>