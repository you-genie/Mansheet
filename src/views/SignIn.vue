<template>
  <div id="signip">
    <base-card dark>
      <v-img
        class="grey lighten-2"
        height="600"
        width="100%"
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
              Sign In
            </h1>
            <div class="subheading text-uppercase pl-2 mb-4">
              Light Your Time in most Beautiful Way
            </div>

            <v-form>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field
                    label="ID"
                    placeholder="Insert Your ID"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
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
            >
              Sign In
            </v-btn>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>

  <about />

  </div>
</template>

<script>
  export default {
    name: 'Signin',

    components: {
      About: () => import('@/components/home/About'),
      Banner: () => import('@/components/home/Banner'),
    },
    data () {
      return {
        show: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        }
      }
    }
  }
</script>