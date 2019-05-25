import request from "../../api/api";
import * as type from "../mutatios";

const state = {
  tabList: [{id:'全部',label:'全部'}],// 标签列表
  recentlyArticleList: [],// 最新的4篇文章列表
  articleAll: [],// 往期精彩列表
  moreHove: true,// 还有没有文章
  imgList:[],//图片列表
  filter:[],//过滤掉的4个id
}
const mutations = {
  //  获取标签列表
  [type.GET_TAB_LIST](state, data) {
    state.tabList = [...state.tabList,...data]
  },
  //  获取最新的4篇文章
  [type.GET_RECENTLY_ARTICLE](state, data) {
    state.recentlyArticleList = data
  },
  //  获取往期精彩列表
  [type.GET_ARTICLE_ALL](state, data) {
    state.articleAll = [...state.articleAll, ...data]
  },
  //  改变查看更多和没有更多了
  [type.CHANGE_MORE_HAVE](state, data) {
    state.moreHove = data
  },
  //  清空往期精彩列表
  [type.EMPTY](state) {
    state.articleAll = []
  },
  // 获取阅读量最多的文章图片
  [type.NEWEST_ARTICLE_IMG](state, data) {
    state.imgList = data
  },
  // 设置要过滤掉的4个id
  [type.FILTERLIST](state, data) {
    state.filter = data
  },
}
const actions = {
  /**
  * @author 郑雨峰
  * @information 获取标签列表
  * @date 2019-05-20
  */
  getTabList({ commit }, data) {
      request.getTabList().then(res => {
        commit(type.GET_TAB_LIST, res.data.result)
      })
  },
  /**
  * @author 郑雨峰
  * @information 获取最新得4篇文章
  * @date 2019-05-20
  */
  async getRecentlyArticle({ commit }, data) {
    let queryAll = {}
    if(data.filter.length == 0){
    //  获取最新的四篇文章，并且获取要过滤掉的那四个id
    let idArr = await request.getRecentlyArticle(data.queryRecently).then(res => {
      // 最新文章
      commit(type.GET_RECENTLY_ARTICLE, res.data.result)
      let idArr = res.data.result.map(item => item.id)
      return idArr
    })
    //  获取往期精彩的查询条件
    queryAll = {
      pageInfo: data.pageInfo,
      filter: idArr
    }
    commit(type.FILTERLIST, idArr)
    }else{
      queryAll = {
        pageInfo: data.pageInfo,
        filter: data.filter
      }
    }
    //  获取往期精彩
    request.getAllArticle(queryAll).then(res => {
      if (res.data.result.length == 0) {
        commit(type.CHANGE_MORE_HAVE, false)
      } else {
        // 此处处理的是如果在一个标签下翻到没有更多，这是切换标签还会是没有更多，此处处理这个bug
        commit(type.CHANGE_MORE_HAVE, true)
        commit(type.GET_ARTICLE_ALL, res.data.result)
      }
    })
  },
  /**
  * @author 郑雨峰
  * @information 清空往期精彩
  * @date 2019-05-20
  */
  empty({ commit }, data){
    commit(type.EMPTY)
  },
  /**
  * @author 郑雨峰
  * @information 获取阅读量最多的文章图片
  * @date 2019-05-20
  */
  getImgList({ commit }, data){
    request.getImgList().then(res => {
      commit(type.NEWEST_ARTICLE_IMG, res.data.result)
    })
  },
  // 设置要过滤的4个id
  setFilterList({ commit }, data){
    commit(type.FILTERLIST, data)
  }
}
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
})

