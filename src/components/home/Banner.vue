<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="650"
      width="100%"
      gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      :src="require('@/assets/articles/real.png')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md6
        >
          <h1 class="display-3 font-weight-light">
            Mansheet
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            Light Your Time in most Beautiful Way
          </div>
          <v-btn
            color="primary"
            depressed
            round
            href="/signup"
          >
            Sign Up
          </v-btn>
          <gen-group />
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>
<script>
  export default {
    components: {
      GenGroup: ()=> import('@/components/dialog/SignIn')
    },
    data: () => ({
      dialog: false
    })
  }
</script>