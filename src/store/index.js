import Vue from 'vue'
import Vuex from 'vuex'
import bottom from './module/bottom'
import cinema from './module/cinema'
import city from './module/city'
//import login from './module/login'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
     plugins: [createPersistedState(
      {storage: window.sessionStorage}
     )],
  modules: {
    bottom,
    cinema,
    city,
    //login
 

  }
})

export default store
