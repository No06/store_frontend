import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify, SvgIcon } from './plugins/vuetify';

const app = createApp(App)

app.component('SvgIcon', SvgIcon)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
