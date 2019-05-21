<template>
  <div id="signup">
    <base-card dark>
      <v-img
        class="grey lighten-2"
        height="600"
        width="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        :src="require('@/assets/articles/wedonttalk.jpg')"
      >
        <v-layout
          fill-height
          align-center
          pa-3
        >
          <v-flex
            xs6
            md7
            offset-md5
          >
            <h1 class="display-3 font-weight-light">
              Sign Up
            </h1>
            <div class="subheading text-uppercase pl-2 mb-4">
              Light Your Time in most Beautiful Way
            </div>

            <v-form>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field
                    v-model="username"
                    label="ID"
                    placeholder="(기수)(아이디) 예: 13nakji"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    hint="At least 4 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
            <v-btn
              color="primary"
              depressed
              round
              @click="signUpSubmit"
            >
              Submit
            </v-btn>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>


  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Signup',

    components: {
      About: () => import('@/components/home/About'),
      Banner: () => import('@/components/home/Banner'),
    },
    data () {
      return {
        show: false,
        username: null,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 4 || 'Min 4 characters',
        }
      }
    },
    computed: {
    },
    methods: {
      ...mapActions(['signUp']),
      signUpSubmit () {
        this.signUp({ 
          username: this.username, 
          password: this.password 
        });
      }
    }
  }
</script>