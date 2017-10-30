import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home.vue'
import Meetups from '@/components/Meetup/Meetups.vue'
import Meetup from '@/components/Meetup/Meetup.vue'
import Create from '@/components/Meetup/CreateMeetup.vue'
import Profile from '@/components/User/Profile.vue'
import Signin from '@/components/User/Signin.vue'
import Signup from '@/components/User/Signup.vue'
import UserDetails from '@/components/User/UserDetails.vue'

import AuthGuard from './auth-guard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'Create',
      component: Create,
      beforeEnter: AuthGuard

    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
     {
     path: '/userdetails',
      name: 'UserDetails',
      component: UserDetails
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]

})
