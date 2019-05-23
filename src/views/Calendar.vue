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
                  <div
                    v-if="event.start_time"
                    :key="event.groupname"
                    :style="{opacity: 0.5, top: timeToY(event.start_time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                    class="my-event with-time"
                    v-bind:class="[
                      {'color1' : i%15 == 0},
                      {'color2' : i%15 == 1},
                      {'color3' : i%15 == 2},
                      {'color4' : i%15 == 3},
                      {'color5' : i%15 == 4},
                      {'color6' : i%15 == 5},
                      {'color7' : i%15 == 6}, 
                      {'color8' : i%15 == 7},
                      {'color9' : i%15 == 8},
                      {'color10' : i%15 == 9},
                      {'color11' : i%15 == 10},
                      {'color12' : i%15 == 11},
                      {'color13' : i%15 == 12},
                      {'color14' : i%15 == 13},
                      {'color15' : i%15 == 14}]"
                    @click="open(event)"
                    v-html="event.groupname"
                  > </div>
                </template>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>

    </div>
  </v-container>
</template>
<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: black;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
  .color1 {
    background-color: #6b5b95;
    border: 1px solid #6b5b95;
    color: white;
  }
  .color2 {
    background-color: #feb236;
    border: 1px solid #feb236;
    color: black;
  }
  .color3 {
    background-color: #d64161;  
    border: 1px solid #d64161;
    color: black; 
  }
  .color4 {
    background-color: #ff7b25;
    border: 1px solid #ff7b25; 
    color: black;      
  }
  .color5 {
    background-color: #e3eaa7; 
    border: 1px solid #e3eaa7;
    color: black;      
  }
  .color6 {
    background-color: #f7786b;
    border: 1px solid #f7786b;
    color: black;       
  }
  .color7 {
    background-color: #b5e7a0;
    border: 1px solid #b5e7a0;
    color: black;      
  }
  .color8 {
    background-color: #fefbd8;
    border: 1px solid #fefbd8;
    color: black;      
  }
  .color9 {
    background-color: #ffef96;
    border: 1px solid #ffef96;
    color: black;       
  }
  .color10 {
    background-color: #50394c;
    border: 1px solid #50394c;
    color: black;       
  }
  .color11 {
    background-color: #4040a1;
    border: 1px solid #4040a1;
    color: black;       
  }
  .color12 {
    background-color: #f4e1d2;
    border: 1px solid #f4e1d2;
    color: black;       
  }
  .color13 {
    background-color: #ffcc5c;
    border: 1px solid #ffcc5c;
    color: black;       
  }
  .color14 {
    background-color: #f18973;
    border: 1px solid #f18973;
    color: black;       
  }
  .color15 {
    background-color: #ff6f69;
    border: 1px solid #ff6f69;
    color: black;       
  }  
</style>
<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Calendar',
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      start: new Date().toISOString().substr(0, 10),
      color_preset: this.$vuetify.theme.color_preset
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
    mounted () {
      if (this.group == "all") {
        console.log("you need to implement this part")
      }
      this.$refs.calendar.scrollToTime('13:00'),
      this.fetchUserData
    },
    methods: {
      open (event) {
        alert(event.groupname)
      },
      getcolor (i) {
        return this.color_preset[i]
      }
    }
  }
</script>
