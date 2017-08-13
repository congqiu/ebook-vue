// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import myFun from './assets/fun.js'
import defaultData from './assets/default.js'
import bus from './assets/eventBus.js'

Vue.config.productionTip = false
Vue.use(vueResource)

Vue.prototype.myData = defaultData

Vue.prototype.bus = bus

Vue.prototype.myFun = myFun
Vue.prototype.isLogin = myFun.isLogin
Vue.prototype.checkLogin = myFun.checkLogin
Vue.prototype.checkLoginCallback = myFun.checkLoginCallback
Vue.prototype.getCookie = myFun.getCookie
Vue.prototype.delCookie = myFun.delCookie

Vue.directive('title', {
  update: function (el, binding) {
    document.title = binding.value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
