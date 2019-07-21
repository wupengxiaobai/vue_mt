import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import axios from "axios"
import xss from "xss";


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$xss = xss

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')