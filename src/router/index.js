import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/center',
    component: () => import('@/views/center')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/films',
    component: () => import('@/views/films'),
    children: [
      {
        name: 'now',
        path: 'Nowplaying',
        component: () => import('@/views/film/Nowplaying')
      },
      {
        path: 'comingsoon',
        component: () => import('@/views/film/ComingSoon')
      },
     
      {
        path: '',
        redirect: '/films/Nowplaying'
      }
    ]

  },
  {
    path: '/detail/:id',
    component: () => import('@/views/detail'),
    /* props: true */
   
  },
  {
    path: '/detail/:id/cinema',
    component: () => import('@/views/details/cinema'),
    /* props: true */
   
  },
  {
    path: '/cinema',
    component: () => import('@/views/cinema'),
    beforeEnter (to, from, next) {
      console.log('进入cinema')
      next()
    }
  },
 
  {
    path: '/cinema/search',
    component: () => import('@/views/cinema/search')
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/',
    redirect: '/films/Nowplaying'
  },
  {
    path: '*',
    redirect: '/films/Nowplaying'
  }
]
const router = new Router({
  routes
})

/* router.beforeEach((to, from, next) => {
  if (to.path === '/center') {
     if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    } 
  } else {
    next()
  }
}) */
export default router
