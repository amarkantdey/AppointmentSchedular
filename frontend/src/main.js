import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin, ButtonGroupPlugin, AlertPlugin, ToastPlugin, FormInputPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ButtonGroupPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(FormInputPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
