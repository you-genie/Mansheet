<template>
  <v-flex
    xs12
    :class="classes"
  >
    <base-card
      :height="150"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        :src="require(`@/assets/articles/${picture}`)"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout
          fill-height
          wrap
          ma-0
        >
          <v-flex xs12
          	text-xs-left>
            <h2 class="title font-weight-bold mb-2">
              {{ value.groupname }}
            </h2>
            <v-subheading>{{ value.ownername }}</v-subheading>
            <div class="caption">
              manages
            </div>
          </v-flex>
          <v-flex
          	align-self-end
          	align-end>
          	<join-group
          		:value="value" 
          	/>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>
  </v-flex>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        required: true
      },
      picture: String,
      value: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
    	JoinGroup: () => import('@/components/dialog/JoinGroup')
    },
    computed: {
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
        }
      }
    }
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>