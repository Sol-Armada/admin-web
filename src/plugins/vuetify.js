/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VSkeletonLoader,
  },
  date: {
    adapter: VuetifyDateAdapter,
  },
  blueprint: md3,
  theme: {
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          // custom colors
          admiral: '#235cff',
          commander: '#fff',
          lieutenant: '#5796ff',
          specialist: '#da5c5c',
          technician: '#e69737',
          member: '#ffc900',
          recruit: '#1cfac0',
          guest: '#fff',
          ally: '#e05b03',
          bot: '#fff',
        },
      },
      dark: {
        colors: {
          // custom colors
          admiral: '#143692',
          commander: '#929292',
          lieutenant: '#365ea1',
          specialist: '#7a3434',
          technician: '#885920',
          member: '#9b7900',
          recruit: '#118868',
          guest: '#929292',
          ally: '#883701',
          bot: '#929292',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
})
