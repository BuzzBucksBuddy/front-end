import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useProductStore } from '@/stores/product'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { Bar } from 'vue-chartjs';

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// app.use(createPinia())
app.component('MyProductsChart', Bar) // Vue Chart.js를 전역 컴포넌트로 등록
app.use(pinia)
app.use(router)

app.mount('#app')

// 다른 곳에서 사용할 때
const productStore = useProductStore()
