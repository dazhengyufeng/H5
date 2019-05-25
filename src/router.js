import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      redirect:'/strict'
    },
    // 招聘页面
    {
      path: '/recruit',
      name: 'recruit',
      component: () => import('@/views/recruit')
    },
    // 千家严选
    {
      path: '/strict',
      name: 'strict',
      component: () => import('@/views/strict')
    },
    // 新加的页
    {
      path: '/PublicHome',
      name: 'PublicHome',
      component: () => import('@/views/PublicHome')
    }
  ]}
)
