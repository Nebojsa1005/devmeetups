import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OrganizeMeetup from '../views/OrganizeMeetup'
import Profile from '../views/Profile.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/organize-meetup',
    name: 'OrganizeMeetup',
    component: OrganizeMeetup
  },
  {
    path:'/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/sing-in',
    name: 'SignIn',
    component: SignIn
  },
  // {
  //   path: '/:notFound(.*)',
  //   redirect: '/sign-up'
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
