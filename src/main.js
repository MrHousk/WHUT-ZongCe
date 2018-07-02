import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'

import '@/styles/index.scss'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.use(axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})