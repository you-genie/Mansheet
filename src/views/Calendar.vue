<template>  
  <v-container
    grid-list-xl
    align-center
  >
    <div id="calendar_div">
      <v-layout
        fill-height
        fill-width
        align-center
        pa-3
      >
        <v-flex>
          <v-sheet 
            height="100%"
            width="100%"
          >
            <br>
            <v-layout fill-width justify-space-around>
              <v-btn round flat @click="$refs.calendar.prev()">
                <v-icon dark>
                  mdi-chevron-left
                </v-icon>
                Prev
              </v-btn>
              <div class="display-2 font-weight-thin">{{group}}
                <small>'s calendar</small>
              </div>
              <v-btn round flat @click="$refs.calendar.next()">
                Next
                <v-icon dark>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </v-layout>
            <br>
            <v-divider />
            <v-calendar
              ref="calendar"
              v-model="start"
              :value="today"
              color="primary"
              type="week"
            >
              <!-- the events at the top (all-day) -->
              <template v-slot:dayHeader="{ date }">
                <template v-for="event in eventsMap[date]">
                  <!-- all day events don't have time -->
                  <div
                  v-if="!event.start_time"
                  :key="event.groupname"
                  class="my-event"
                  @click="open(event)"
                  v-html="event.groupname"
                  ></div>
                </template>
              </template>
              <!-- the events at the bottom (timed) -->
              <template 
                v-slot:dayBody="{ date, timeToY, minutesToPixels }"
              >
                <template v-for="(event, i) in eventsMap[date]">
                  <!-- timed events -->
                  <color-event
                    :i="groupInfo.groupid == -1 ? event.groupname.charCodeAt(0) * i + event.username.charCodeAt(0) : event.groupid == groupInfo.groupid ? -1 : event.username.charCodeAt(0)"
                    :start_time="event.start_time"
                    :groupname="groupInfo.groupid == -1 ? event.groupname : event.groupid == groupInfo.groupid ? event.groupname : event.username"
                    :op="event.groupid == groupInfo.groupid ? 1 : entryOpacity"
                    :timeToY="timeToY(event.start_time)"
                    :minutesToPixels="minutesToPixels(event.duration)"
                    :clickable="event.clickable"
                    :sid="event.sid"
                    :event="event"
                  />
                </template>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>

    </div>
  </v-container>
</template>
<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'Calendar',
    data: () => ({
      today: null,
      start: new Date().toISOString().substr(0, 10)
    }),
    props: {
      group: String
    },
    computed: {
      ...mapGetters(['groupEntrySize']),
      ...mapState(['user', 'password', 'schedules', 'groupInfo', 'fetch']),
      ...mapActions(['fetchUserData']),
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.schedules.forEach(e => {
          if (e.groupid != this.groupInfo.groupid) {
            e.clickable = false;
            if (map[e.start_date] == null) {
              map[e.start_date] = []
            }
            map[e.start_date].push(e);
          }
        })
        this.schedules.forEach(e => {
          if (e.groupid == this.groupInfo.groupid) {
            e.clickable = true;
            if (map[e.start_date] == null) {
              map[e.start_date] = []
            }
            map[e.start_date].push(e)
          }
        })
        return map
      },
      entryOpacity () {
        const opacity = this.groupEntrySize;
        return opacity;
      }
    },
    components: {
      ColorEvent: () => import ('@/components/base/ColorEvent')
    },
    watch: {
      group: function (changedGroup) {
        this.getSchedule({"groupname": this.group})
      }
    },
    mounted () {
      if (this.group == "all") {
        this.getAllSchedules()
      } else {
        this.getSchedule({"groupname": this.group})
      }
      this.$refs.calendar.scrollToTime('13:00')
      // this.fetchUserData
    },
    methods: {
      ...mapActions(['getSchedule', 'getAllSchedules'])
    }
  }
</script>
