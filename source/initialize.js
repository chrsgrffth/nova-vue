// // Import.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Store from './vuex/store'

// Register.
Vue.use(VueRouter)
Vue.use(VueResource)

// Instantiate app.
const app = new Vue({
  components: {
    App: require('./components/App')
  },
  store: Store
}).$mount('#app')
