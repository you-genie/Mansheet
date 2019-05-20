<template>
  <v-container
    grid-list-xl
  >
	  <div id="groups">
	    <v-layout wrap>
	      <group-card
	        v-for="(group, i) in paginatedGroups"
	        :key="group.name"
	        :size="layout[i]"
	        :value="group"
	      />
		    <v-layout align-center>
		      <v-flex xs3>
		        <base-btn
		          v-if="page !== 1"
		          class="ml-0"
		          title="Previous page"
		          square
		          @click="page--"
		        >
		          <v-icon>mdi-chevron-left</v-icon>
		        </base-btn>
		      </v-flex>

		      <v-flex
		        xs6
		        text-xs-center
		        subheading
		      >
		        PAGE {{ page }} OF {{ pages }}
		      </v-flex>

		      <v-flex
		        xs3
		        text-xs-right
		      >
		        <base-btn
		          v-if="pages > 1 && page < pages"
		          class="mr-0"
		          title="Next page"
		          square
		          @click="page++"
		        >
		          <v-icon>mdi-chevron-right</v-icon>
		        </base-btn>
		      </v-flex>
		    </v-layout>
			</v-layout>
	  </div>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Groups',

    components: {
      GroupCard: () => import('@/components/base/GroupCard')
    },

    data: () => ({
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
      page: 1
    }),

    computed: {
      ...mapState(['groups']),
      pages () {
        return Math.ceil(this.groups.length / 11)
      },
      paginatedGroups () {
        const start = (this.page - 1) * 11
        const stop = this.page * 11

        return this.groups.slice(start, stop)
      },
      ...mapActions(['fetchUser']),
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
