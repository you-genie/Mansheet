<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          small
          dark
          color="#ff6f00"
          title="Add Schedule"
          v-on="on"
        >
          <v-icon>mdi-alarm-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Schedule</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs11>
                <v-flex xs12>
                  <v-subheader>Time</v-subheader>
                </v-flex>
                <v-menu
                  ref="menu"
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
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-subheader>Group</v-subheader>
              </v-flex>
              <single-group-select />
              <v-flex xs12>
                <v-subheader>Info</v-subheader>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="info"
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
          <v-btn color="blue darken-1" flat @click="dialog = false">Make</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'GenSchedule',
    components: {
      SingleGroupSelect: () => import('@/components/base/SingleGroupSelect')
    },
    data: () => ({
      dialog: false,
      time_menu: false,
      time: null
    })
  }
</script>