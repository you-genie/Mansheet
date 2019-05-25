<template>
  <v-layout>
  	<div
  	  v-if="start_time"
  	  :key="groupname"
  	  :style="{opacity: op, top: timeToY + 'px', height: minutesToPixels + 'px' }"
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
  	    {'color15' : i%15 == 14},
        {'colorOwner': i == -1}]"
  	  @click="toggle"
  	  v-html="groupname"
  	> </div>
    <schedule-info
      v-if="clickable"
      :toggle="openInfo"
      :event="event"
    ></schedule-info>
  </v-layout>
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
    background-color: #c6ff00;  
    border: 1px solid #c6ff00;
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
    color: white;       
  }
  .color11 {
    background-color: #4040a1;
    border: 1px solid #4040a1;
    color: white;       
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
  .colorOwner {
    background-color: #fa487d;
    border: 1px solid #fa487d;
    color: white;
  }
</style>
<script>

  export default {
    data: () => ({
      openInfo: false
    }),
  	props: {
  		i: Number,
  		start_time: String,
  		groupname: String,
  		op: Number,
  		timeToY: Number,
  		minutesToPixels: Number,
      clickable: Boolean,
      sid: Number,
      event: Object
  	},
    components: {
      ScheduleInfo: () => import('@/components/dialog/ScheduleInfo')
    },
    name: 'ColorEvent',
    methods: {
      toggle (event) {
        this.openInfo = !this.openInfo;
      }
    }
  }
</script>
