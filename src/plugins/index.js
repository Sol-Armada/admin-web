/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
import pinia from '@/store'
import router from '@/router'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
}
