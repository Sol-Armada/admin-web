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
          background: '#eeeeee',
          surface: '#fafafa',
          // custom colors
          admiral: '#1E52E6',
          commander: '#308CA7',
          lieutenant: '#24AD32',
          specialist: '#DA5C5C',
          technician: '#E69737',
          member: '#FFC900',
          recruit: '#1CFAC0',
          guest: '#929292',
          ally: '#F87847',
          bot: '#206694',
        },
      },
      dark: {
        colors: {
          // custom colors
          admiral: '#1E52E6',
          commander: '#308CA7',
          lieutenant: '#24AD32',
          specialist: '#DA5C5C',
          technician: '#E69737',
          member: '#FFC900',
          recruit: '#1CFAC0',
          guest: '#929292',
          ally: '#F87847',
          bot: '#206694',
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
