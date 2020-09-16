const login = {
    namespaced: true,
    state: {
    
    },
    mutations: {
      setUsername (state, username) {
        state.username = username
      },
      setPassword (state, password) {
        state.password = password
      }
    }
  }
  
  export default login
  