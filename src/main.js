import Vue from 'vue'
import {store} from './store/index'
import * as firebase from 'firebase'
import Alert from './shared/Alert.vue'
import Edit from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditProfile from './components/Meetup/Edit/EditProfile.vue'
import UserDetails from './components/User/UserDetails.vue'


import Registration from './components/Meetup/Registration/Register.vue'


import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VForm,
  VTextField,
  VDatePicker,
  VTimePicker,
  transitions,
  VProgressCircular,
   VDialog,
   VDivider,
   VAvatar,
   VDataTable,
  VAlert
} from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VForm,
    VTextField,
    VDatePicker,
    VTimePicker,
    transitions,
    VProgressCircular,
    VDialog,
    VDivider,
    VAvatar,
       VDataTable,

    VAlert

  }
})

Vue.component('app-alert', Alert);
Vue.component('app-edit-details-dialog', Edit)
Vue.component('app-register', Registration)
Vue.component('app-edit-profile', EditProfile)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
    firebase.initializeApp({
       apiKey: "AIzaSyBK9AM1x-wwf4aPX8Vf1s5XYB08XIuzPbA",
    authDomain: "meetup-6cba3.firebaseapp.com",
    databaseURL: "https://meetup-6cba3.firebaseio.com",
    projectId: "meetup-6cba3",
    storageBucket: "gs://meetup-6cba3.appspot.com/"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoSignin', user)
         this.$store.dispatch('fetchUserData', user)
                  this.$store.dispatch('fetchUserDetails', user)

      }
    })
    this.$store.dispatch('loadMeetups');
   
  }
})
