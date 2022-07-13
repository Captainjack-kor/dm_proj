import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from "axios";
// import dotenv from 'dotenv';

// dotenv.config();
Vue.use(axios);
Vue.config.productionTip = false

new Vue({
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
