import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Modal from './components/Modal/index.vue'

createApp(App)
  .use(store)
  .use(router)
  .component('Modal', Modal)
  .mount('#app')
