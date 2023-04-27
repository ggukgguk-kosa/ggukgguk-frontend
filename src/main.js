import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { AVPlugin } from 'vue-audio-visual'

window.baseURI = process.env.VUE_APP_BASE_URI;

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VCalendar, {})
  .use(AVPlugin)
  .mount('#app')
