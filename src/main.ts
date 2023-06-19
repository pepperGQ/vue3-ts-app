import { createApp } from 'vue'
// 完整引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
// 完整引入
// app.use(ElementPlus)

app.mount('#app')
