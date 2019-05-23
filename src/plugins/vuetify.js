import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
  theme: {
    primary: '#fa487d',
    secondary: '#d33e1e',
    color_preset: [
	  	'colors.red.lighten-1',
	  	'colors.lime.lighten-2',
	  	'colors.indigo.darken-4',
	  	'colors.pink.accent-2',
	  	'colors.orange.accent-1',
	  	'colors.green.light-1',
	  	'colors.pink.lighten-1',
	  	'colors.indigo.accent-2',
	  	'colors.amber.lighten-1',
	  	'colors.purple.lighten-1',
	  	'colors.teal.accent-2',
	  	'colors.blue.lighten-1',
	  	'colors.red.accent-3',
	  	'colors.purple.accent-3',
	  	'colors.green.darken-1',
	  	'colors.deep-purple.darken-1',
	  	'colors.indigo.darken-1',
	  	'colors.green.accent-2',
	  	'colors.deep-orange.darken-1',
	  	'colors.brown.lighten-1',
	  	'colors.yellow.accent-2',
	  	'colors.cyan.darken-2',
	  	'colors.lime.darken-1',
	  	'colors.deep-purple.darken-4',
	  	'colors.amber.darken-1',
	  	'colors.red.darken-1'
    ]
  },
  iconfont: 'mdi',
  options: {
    customProperties: true
  }
})
