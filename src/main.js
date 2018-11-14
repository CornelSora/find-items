// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify';
Vue.use(Vuetify);

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$firebase = firebase

  // Initialize Firebase
 const config = {
  apiKey: "AIzaSyB414c6cDZcOQE9TZJ9iMf4-nayWjwbAvM",
  authDomain: "lost-things-3e9e3.firebaseapp.com",
  databaseURL: "https://lost-things-3e9e3.firebaseio.com",
  projectId: "lost-things-3e9e3",
  storageBucket: "lost-things-3e9e3.appspot.com",
  messagingSenderId: "96179173659"
};
firebase.initializeApp(config);

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
