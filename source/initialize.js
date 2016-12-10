// // Import.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Register.
Vue.use(VueRouter)
Vue.use(VueResource)

// Instantiate app.
const app = new Vue({
  components: {
    NotesIndex: require('./components/NotesIndex'),
    Editor: require('./components/Editor')
  }

}).$mount('#app')
