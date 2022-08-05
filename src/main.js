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
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

const app = createApp(App)

app.config.globalProperties.$filters = { currency, date }
// $httpMessageState 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast
app.config.globalProperties.$httpMsgState = $httpMessageState

// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
