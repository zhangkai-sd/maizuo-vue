import Vue from 'vue'
Vue.filter('actios', (actios) => {
  // console.log(actios)
  if (actios) {
    return actios.map(item => item.name).join(' ')
  }
})
