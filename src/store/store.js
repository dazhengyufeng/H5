import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import request from "../api/api.js";
import * as type from "./mutatios";
import commonUtil from "../assets/js/commonUtil"
import publicHome from "./publicHome/publicHome"

const state = {
  // 图文列表
  articleList: [],
}
const getters = {
  // 图文列表
  articleList: state => state.articleList
}
const mutations = {
  // 图文列表
  [type.ARTICLELIST](state, paylod) {
    state.articleList = paylod
  },
}
const actions = {
  /**
   * @author liuguisheng
   * @date  2019-03-06 15:00
   * @information 页面初始化
  */
  pageInit: function ({ dispatch }, model) {
    return new Promise((resolve, reject) => {
      dispatch('getUserOnlyCard').then(() => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    }).then(() => {
      dispatch('getArticleList', model);
    })
  },
  /**
   * @author liuguisheng
   * @date 2019-03-06 14:55
   * @information 获取用户的唯一身份
  */
  getUserOnlyCard: function () {
    return request.getUserOnlyCard().then(res => {
      let { access_token } = res.data;
      console.log(access_token)
      commonUtil.setCookie("token", access_token);
    })
  },
  /**
   * @author liuguisheng
   * @date 2019-03-06 15:00
   * @information 获取图文列表
   * @params { model } 需要给后台的实体
  */
  getArticleList: function ({ commit }, model) {
    request.getArticleList(model).then(res => {
      let { data } = res.data;
      console.log(data)
      commit(type.ARTICLELIST, data)
    })
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    publicHome
  }
})

