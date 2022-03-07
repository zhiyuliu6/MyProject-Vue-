import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from './router'
import VueAxios from 'vue-axios'
import axios from "axios";
import store from './store/index'


Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.use(ElementUI,{locale})
Vue.use(VueRouter)
new Vue({
  el:'#app',
  render: h => h(App),
  store,
  router:router
})
