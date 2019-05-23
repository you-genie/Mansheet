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
                    :i="i"
                    :start_time="event.start_time"
                    :groupname="event.groupname"
                    :opacity="0.5"
                    :timeToY="timeToY(event.start_time)"
                    :minutesToPixels="minutesToPixels(event.duration)"
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
    mapActions
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
      ...mapState(['user', 'password', 'schedules']),
      ...mapActions(['fetchUserData']),
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.schedules.forEach(e => (map[e.start_date] = map[e.start_date] || []).push(e))
        return map
      }
    },
    components: {
      ColorEvent: () => import ('@/components/base/ColorEvent')
    },
    mounted () {
      if (this.group == "all") {
        console.log("you need to implement this part")
      }
      this.$refs.calendar.scrollToTime('13:00'),
      this.fetchUserData
    },
    methods: {
    }
  }
</script>
