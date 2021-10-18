import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import echarts from 'echarts'
import VueParticles from 'vue-particles'
import scroll from 'vue-seamless-scroll'
import 'babel-polyfill'
import htmlToExcel from './excel/htmlToExcel'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueParticles)
Vue.use(scroll)
Vue.prototype.axios = axios
Vue.prototype.echarts = echarts
Vue.config.productionTip = false
Vue.prototype.htmlToExcels = htmlToExcel

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // next()
  document.title = to.meta.title
  // const isLogin = sessionStorage.getItem('isLogin')
  // if (to.path === '/login') {
  //   if (isLogin != null) {
  //     next('/main')
  //   }
  // } else if (isLogin === null) {
  //   next('/login')
  // }
  next()
})
