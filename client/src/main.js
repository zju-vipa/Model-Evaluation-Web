import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/rem.js'
import router from './router'
import store from "./store"
import i18n from "./plugins/i18n";
import "./models/config"
import './assets/icons'

Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
