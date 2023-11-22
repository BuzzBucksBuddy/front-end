import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { Bar } from 'vue-chartjs';

import '@/assets/fonts.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// app.use(createPinia())
app.component('MyProductsChart', Bar) // Vue Chart.js를 전역 컴포넌트로 등록
app.use(pinia)
app.use(router)

app.mount('#app')
