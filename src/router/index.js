import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'InitialPage',
    component: () => import('@/Views/InitialPage')
  },
  {
    path: '/event',
    name: 'Main',
    redirect: { name: 'UnsubscriptedEvents' },
    component: () => import('@/Views/Main'),
    children: [
      {
        path: 'unsubscripted',
        name: 'UnsubscriptedEvents',
        component: () => import('@/Views/UnsubscriptedEvents')
      },
      {
        path: 'owned',
        name: 'OwnedEvents',
        component: () => import('@/Views/OwnedEvents')
      },
      {
        path: 'inscripted',
        name: 'InscriptedEvents',
        component: () => import('@/Views/InscriptedEvents')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/Views/Profile')
      },
    ]
  },
 /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" *//* '../views/About.vue')
    }*/
  //}
]

const router = new VueRouter({
 // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
