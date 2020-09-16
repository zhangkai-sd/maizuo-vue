const bottom = {
  namespaced: true,
  state: {
    isbottom: true
  },
  mutations: {
    show (state) {
      state.isbottom = true
    },
    hide (state) {
      state.isbottom = false
    }
  }
}

export default bottom
