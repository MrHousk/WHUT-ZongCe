import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import '@/assets/icons/iconfont'
import '@/styles/index.scss'
import 'vue2-animate/dist/vue2-animate.min.css'

import zIcon from '@/components/z-icon.vue'

Vue.use(axios)
Vue.use(ElementUI)

Vue.component(zIcon.name, zIcon)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})