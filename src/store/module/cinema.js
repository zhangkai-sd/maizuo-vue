import { instance } from '@/utils/http'
const cinema = {
  namespaced: true,
  state: {
    cinemaList: []
  },
  mutations: {
    setCinemaList (state, data) {
      state.cinemaList = data
    }
  },
  actions: {
    getCinemaList (context, cityId) {
      instance.get('/gateway?cityId=' + cityId + '&ticketFlag=1&k=8779191', {
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
}

export default cinema
