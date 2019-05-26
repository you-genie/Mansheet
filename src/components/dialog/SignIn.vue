<template>
    <v-dialog 
      v-model="dialog" 
      persistent 
      max-width="500"
      :dark="error ? true : false"
    >
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
            <v-form>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field 
                    v-model="username"
                    label="ID" 
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                    v-model="password"
                    :rules="[rules.required, rules.min, rules.error]"
                    label="Password" 
                    type="password" 
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click="dialog = false">Close</v-btn>
          <v-btn 
            :color="error ? 'warning' : 'secondary'"
            flat 
            @click="signInSubmit"
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  export default {
    name: 'Signin',
    data: () => ({
      username: null,
      password: null,
      dialog: false,
      error: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 4 || 'Min 4 characters',
      }
    }),
    methods: {
      ...mapActions(['signIn']),
      signInSubmit () {
        this.error = true;
        this.dialog = false;
        this.signIn({
          username: this.username,
          password: this.password
        });
      }
    }
  }
</script>