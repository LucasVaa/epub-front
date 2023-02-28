import Vue from 'vue'
import App from './App'
import router from './router'
import storage from '@/util/storage'
import ui from './components/index'
import './util/highlight'
import './scss/main.scss'
import Global from '../static/global'   // 引用
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$storage = storage
Vue.prototype.GLOBAL = Global
Vue.prototype.$axios = axios

Vue.use(ui)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
