import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import {routes} from './routes';
import App from './App.vue'
import store from './store/store';
Vue.use(VueRouter)
Vue.prototype.$http = axios;
Vue.filter('currency',(val)=>{
  return '$'+val.toLocaleString()
});

const router = new VueRouter({
  mode:'history',
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
