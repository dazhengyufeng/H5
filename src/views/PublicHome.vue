<template>
  <section>
       <section class="public-home_contain">
           <!-- logo图片区域 -->
    <van-swipe :autoplay="3000" indicator-color="white" class="logo" touchable>
       <van-swipe-item><img src="../assets/img/222.jpg" alt @click="jump('https://hrresume.allhome.com.cn/#/jobs')"></van-swipe-item>
       <van-swipe-item v-for='(item,key) in imgList' :key=key @click="jump(item.url)"><img :src="item.thumbUrl" alt=""></van-swipe-item>
    </van-swipe>
    <!-- tab标签选择部分 -->
    <nav class="nav">
      <van-tabs v-model="active" @click="onClick" swipeable @change='onClick' animated>
        <!-- 最新文章部分 -->
        <van-tab v-for="(item , index) in tabList" :title="item.label" :key='index'>
          <section class="van-tab_main">
            <section class="van-tab_contain">
              <section class="tab-contain_title">最新文章</section>
              <section class="tab-contain_list">
                <section class="tab-list-item" v-for="(item , index) in recentlyArticleList" :key="index" @click="jump(item.url)">
                  <img :src="item.thumbUrl" alt="">
                  <section class="list-item-title">{{item.title}}</section>
                  <section class="item-footer-title">
                    <section class="item-footer-title-contain">
                      <section>{{item.author}}</section>
                      <section>{{disposeTime(item.createTime)}}</section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
         <!-- 往期精彩部分 -->
          <section class="tab-contain_next">
            <section class="next-contain">
              <section class="next-title">往期精彩</section>
              <section class="contain-next_item" v-for="(item , index) in articleAll" :key="index" @click="jump(item.url)">
                <img :src="item.thumbUrl" alt="">
                <section class="next-item_contain">
                  <section class="next-title-first">{{item.title}}</section>
                  <section class="next-title-second">{{item.digest}}</section>
                  <section class="next-contain_footer">
                    <section>{{item.author}}</section>
                    <section>{{disposeTime(item.createTime)}}</section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </van-tab>
      </van-tabs>
      <!-- 尾部 -->
      <footer v-infinite-scroll="infinite" infinite-scroll-disabled="busy" infinite-scroll-distance="10">{{moreHove ? '正在加载' : '没有更多文章了'}}</footer>
    </nav>
  </section>
  </section>
</template>

<script>
/**
 * @author 郑雨峰
 * @information 千家严选
 * @date 2019-05-20
 */
import { mapActions, mapState } from 'vuex'

export default {
  name: "HelloWorld",
  computed: {
    ...mapState('publicHome',[
      "tabList",// 所有tab选项
      "recentlyArticleList",// 最近文章
      "articleAll",//往期精彩
      "moreHove",// 判断还有没有文章
      "imgList",// 轮播图片列表
      "filter"//过滤掉的4个ID
    ]),
  },
  data() {
    return {
      active: 0,//哪个tab是选中状态
      // 查询条件
      queryCondition:{
        // 获取最新文章的查询条件
        queryRecently:{
          categoryId: 0,
          size: 4
        },
        // 往期精彩
        pageInfo: {
          page: 1,
          size: 5
        },
        // 要过滤掉的4篇文章的id
        filter:[]
      },
      busy: false
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    ...mapActions('publicHome',[
      "getTabList",// 获取tab标签列表
      "getRecentlyArticle",// 获取最新的4篇文章
      "getArticleList",// 获取文章列表
      "empty",// 清空往期精彩数据
      "getImgList",// 获取轮播图的图片
      "setFilterList"//设置过滤的4个id
    ]),
    async init(){
    // 获取标签列表
    this.getTabList()
    this.queryCondition.queryRecently = { size: 4 },
    // 获取文章
    this.getRecentlyArticle(this.queryCondition)
    // 获取阅读量最多的文章图片
    this.getImgList()
    },
    /**
    * @author 郑雨峰
    * @information 上拉加载
    * @date 2019-05-20
    */
    infinite(){
      if(this.moreHove){
        this.busy = true;
     //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        this.getMore();
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.busy = false;
      }, 500);
      }
    },
    /**
    * @author 郑雨峰
    * @information 切换标签事件
    * @date 2019-05-20
    */
     onClick(index, title) {
       this.setFilterList([])
       // 清空页码
      this.queryCondition.pageInfo.page = 1
      // 清空往期精彩列表
      this.empty()
      if(index == 0){
        this.queryCondition.filter = this.filter
        this.queryCondition.queryRecently = { size: 4 },
        // 获取文章
        this.getRecentlyArticle(this.queryCondition)
      }else {
        this.queryCondition.filter = this.filter
        // 赋值查询条件的id
        this.queryCondition.queryRecently.categoryId = this.tabList[index].id
        // 获取文章
        this.getRecentlyArticle(this.queryCondition)
      }
    },
    /**
    * @author 郑雨峰
    * @information 处理时间事件
    * @date 2019-05-20
    */
    disposeTime(time){
      return time.slice(0,10)
    },
    /**
    * @author 郑雨峰
    * @information 查看更多事件
    * @date 2019-05-20
    */
    getMore(){
      this.queryCondition.filter = this.filter
      this.queryCondition.pageInfo.page += 1
      // 获取文章
      this.getRecentlyArticle(this.queryCondition)
    },
    /**
    * @author 郑雨峰
    * @information 跳转文章事件
    * @date 2019-05-20
    */
    jump(url){
      window.location.href = url
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
.public-home_contain {
  background-color: #f4f5f5;
  width: 10rem;
  margin: auto;
}
.logo {
  img {
    display: block;
    width: 10rem;
    margin: auto;
    height: 5.68rem;
  }
}
.van-ellipsis {
    font-size: .39rem;
    height: 1.32rem;
    line-height: 1.32rem;
}
.van-tabs__nav--card .van-tab{
  color: #999;
}
.van-tabs__nav--card .van-tab.van-tab--active{
  color: #333333;
}
.van-tab--active {
  font-weight: bold;
}
.nav .van-tabs__line{
  height: .07rem;
}
.nav {
  .van-tabs__wrap {
    height: 1.32rem !important;
    width: 10rem;
    margin: auto;
  }
  .van-tab_main {
    // height: 13.1rem;
    background-color: white;
    .van-tab_contain {
      cursor:pointer;
      padding-top: 0.53rem;
      width: 10rem;
      margin: auto;
      // height: 11.92rem;
      font-size: 0.5rem;
      .tab-contain_title {
        font-size: .44rem;
        font-weight: bold;
        color: #333;
        margin-left: 0.4rem;
      }
      .tab-contain_list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.63rem;
      }
    }
  }
  .tab-contain_next {
    font-size: 0.5rem;
    .next-contain {
      cursor:pointer;
      padding-top: .53rem;
      margin: auto;
      width: 9.2rem;
      .next-title{
        color: #4c4c4c;
        margin-bottom: .19rem;
      }
      .contain-next_item {
        border-bottom: 0.01rem solid #f4f5f5;
        width: 9.2rem;
        height: 3.45rem;
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 3.47rem;
          height: 2.6rem;
          margin-right: 0.31rem;
        }
      }
    }
  }
  .tab-list-item {
    position: relative;
    box-sizing: border-box;
    width: 4.32rem;
    height: 5rem;
    margin-left: 0.4rem;
    margin-right: 0.07rem;
    margin-bottom: 0.68rem;
    img {
      display: block;
      width: 100%;
      height: 3.28rem;
    }
    .list-item-title {
      color: #333;
      font-size: .35rem;
      margin-top: .24rem;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .item-footer-title {
      color: #999;
      font-size: .27rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      .item-footer-title-contain{
        width: 100%;
        display: flex;
       justify-content: space-between;
      }
    }
  }
  .next-item_contain {
    width: 5.41rem;
    .next-title-first {
      color: #333;
      font-size: 0.39rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .next-title-second {
      color: #666;
      font-size: 0.32rem;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }
    .next-contain_footer {
      color: #999;
      display: flex;
      justify-content: space-between;
      font-size: 0.29rem;
    }
  }
  footer {
    color: #989898;
    width: 100%;
    height: 1.33rem;
    background-color: white;
    text-align: center;
    line-height: 1.33rem;
    font-size: 0.29rem;
    cursor:pointer;
  }
  .tab-contain_next {
    margin-top: 0.26rem;
    background-color: white;
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-tabs--line {
    padding-top: 1.58rem;
  }
  .van-tabs__line {
    background-color: #1fb19e;
  }
}
</style>
