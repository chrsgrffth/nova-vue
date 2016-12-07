// // Import.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Components.
import Home from './components/pages/home.vue'

// Register.
Vue.use(VueRouter)
Vue.use(VueResource)


// Define routes.
const routes = [
  { 
    path: '*',
    component: Home 
  },
  {
    path: '/notes',
    component: Home
  }
]

// Define router.
const router = new VueRouter({
  mode: 'history',
  routes
})

// Instantiate app.
const app = new Vue({
  router
}).$mount('#app')

