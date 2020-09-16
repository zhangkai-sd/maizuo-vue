import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './stylesheet/main.scss'
import './utils/rem'
import './utils/filter'
import 'swiper/css/swiper.min.css'
import './utils/directive'
import title from './components/title'
import store from './store/index'
Vue.config.productionTip = false
Vue.component('mz-title', title)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
