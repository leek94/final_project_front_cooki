import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

//브라우저 재실행시 인증 정보를 가져오기
store.dispatch("loadAuth");



createApp(App).use(store).use(router).mount('#app')
