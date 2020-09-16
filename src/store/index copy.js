import Vue from 'vue'
import Vuex from 'vuex'
import { instance } from '@/utils/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isbottom: true,
    cinemaList: []
  },
  mutations: {
    show (state) {
      state.isbottom = true
    },
    hide (state) {
      state.isbottom = false
    },
    setCinemaList (state, data) {
      state.cinemaList = data
    }
  },
  actions: { // 异步获取数据
    getCinemaList (context) {
      instance.get('/gateway?cityId=310100&ticketFlag=1&k=8779191', {
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log(res.data)
        /* this.cinemaList = res.data.data.cinemas */
        context.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  },
  getters: {
    cinemaListfive (store) {
      return store.cinemaList.slice(0, 5)
    }
  }
})

export default store
