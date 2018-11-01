import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/Home/:auto',
      name: 'IndexPage',
      component: () => import("@/components/IndexPage"),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'Login',
      component: () => import("@/components/Login")
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import("@/components/SignUp")
    },
    {
      path: '/cities',
      name: 'Cities',
      component: () => import("@/components/Cities"),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('login')
  } else if (!requiresAuth && currentUser) {
    next('cities') 
  } else  {
    next()
  }
})

export default router
