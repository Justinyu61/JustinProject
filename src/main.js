import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'

const app = createApp(App)

app.config.globalProperties.$filters = { currency, date }
app.config.globalProperties.$httpMsgState = $httpMessageState
// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
