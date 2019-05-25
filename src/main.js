// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import "element-ui/lib/theme-chalk/index.css"
import ElementUI from 'element-ui';
import Vuex from "vuex"
import store from "./store/store"
import VueScroller from 'vue-scroller'
import rem from './rem/rem.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.use(Vant);

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.Bus=new Vue() //注册Bus同级传值
Vue.use(VueScroller)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
