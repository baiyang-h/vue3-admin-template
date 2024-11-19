import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style/index.scss';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

console.log(import.meta.env)

import './permission'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
