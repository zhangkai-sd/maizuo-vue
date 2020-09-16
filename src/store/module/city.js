const city = {
  namespaced: true,
  state: {
    cityName: '上海',
    cityId: '310100'
  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, cityId) {
      state.cityId = cityId
    }
  }
}

export default city
