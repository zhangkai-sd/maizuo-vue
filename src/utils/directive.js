import Vue from 'vue'
import Swiper from 'swiper/js/swiper'
Vue.directive('title', {
  // 插入到dom的时候执行
  inserted (el, binding) {
    el.firstChild.style.opacity = 0.3
    window.onscroll = function () {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
      const value = binding.value || 100
      if (sTop > value) {
        el.firstChild.style.opacity = 1
        el.lastChild.style.opacity = 1
        el.style.background = '#fff'
      } else {
        el.firstChild.style.opacity = 0.5
        el.lastChild.style.opacity = 0
        el.style.background = ''
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})

Vue.directive('swiper', {
  inserted (el, binding) {
    // console.log(binding.value)
    if (binding.value.index === binding.value.value.length - 1) {
      new Swiper("."+binding.value.cName, {  // eslint-disable-line
        loop: binding.value.loop ? binding.value.loop : false,
        slidesPerView: binding.value.slidesPerView ? binding.value.slidesPerView : 1,
        spaceBetween: 30,
        pagination: {
          el: binding.value.pag ? '.swiper-pagination' : null,
          clickable: true
        }
      })
    }
  }
})


Vue.directive('scroll', {
  // 插入到dom的时候执行
  inserted (el, binding) {
    window.onscroll = function () {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
      //const value = binding.value || 100
      if (sTop > 182) {
        el.style.display='flex'
        
      }else{
        el.style.display='none'
       
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})