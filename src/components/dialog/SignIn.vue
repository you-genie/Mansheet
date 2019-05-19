<template>
    <v-dialog v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          depressed
          round
          v-on="on"
        >
          Sign In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign In</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="ID" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click="dialog = false">Close</v-btn>
          <v-btn color="secondary" flat @click="dialog = false">Sign In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'Signin',
    data: () => ({
      dialog: false
    })
  }
</script>