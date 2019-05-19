<template>
  <div id="calendar">
    <v-layout
      fill-height
      fill-width
      align-center
      pa-3
    >
      <v-flex>
        <v-sheet 
          height="600"
          width="100%"
        >
          <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            color="primary"
            type="week"
          >
            <!-- the events at the top (all-day) -->
            <template v-slot:dayHeader="{ date }">
              <template v-for="event in eventsMap[date]">
                <!-- all day events don't have time -->
                <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
                ></div>
              </template>
            </template>
            <!-- the events at the bottom (timed) -->
            <template 
              v-slot:dayBody="{ date, timeToY, minutesToPixels }"
            >
              <template v-for="event in eventsMap[date]">
                <!-- timed events -->
                <div
                  v-if="event.time"
                  :key="event.title"
                  :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"

                  @click="open(event)"
                  v-html="event.title"
                > </div>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #fa487d;
    color: black;
    border: 1px solid #fa487d;
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
</style>
<script>
  export default {
    name: 'Calendar',
    data: () => ({
      today: '2019-05-19',
      events: [
        {
          title: 'Paris',
          date: '2019-05-19',
          time: '21:00',
          duration: 60
        },
        {
          title: 'Paris Sports Complex',
          date: '2019-05-20',
          time: '22:00'
        },
        {
          title: '중간점검',
          date: '2019-05-22',
          time: '20:30',
          duration: 180
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    mounted () {
      this.$refs.calendar.scrollToTime('13:00')
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>
