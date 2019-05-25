import axios from "../assets/js/request";

export default {
  /**
   * @author liuguisheng
   * @date 2019-03-06 13:55
   * @information 获取用户的唯一身份
  */
  getUserOnlyCard: function () {
    return axios.get(`/api/getUserCard`)
  },
  /**
   * @author liuguisheng
   * @date 2019-03-06 14:00
   * @information 获取图文列表
   * @params { model } 需要给后台的实体
  */
  getArticleList: function (model) {
    return axios.post(`/api/getArticleList`, model)
  },
  /**
   * @author 郑雨峰
   * @date 2019-05-21
   * @information 获取标签列表
  */
  getTabList() {
    return axios.get(`/category/list`)
  },
  /**
   * @author 郑雨峰
   * @date 2019-05-21
   * @information 获取最新的四篇文章
  */
  getRecentlyArticle(data) {
    return axios.post(`/article/recently`, data)
  },
  /**
   * @author 郑雨峰
   * @date 2019-05-21
   * @information 获取所有文章
  */
  getAllArticle(data) {
    return axios.post(`/article/list`, data)
  },
  /**
   * @author 郑雨峰
   * @date 2019-05-21
   * @information 获取阅读量最多的文章图片
  */
  getImgList(){
    // 这里现在是固定拿两张，后期可以改成拿其他数量张
    let data = {
      size: 2
    }
    return axios.post(`/article/topRead/thumbUrl`, data)
  }
}
