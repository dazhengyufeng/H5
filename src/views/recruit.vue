<template>
  <div>
     <!--
     @author:王泽通
     @date:2019-02-013
     @instructions:静态响应式页面
     -->
    <!-- Logo开始 -->
    <header>
      <img src="../assets/img/background.jpg" class="head-bg">
      <div class="head-families"></div>
      <img src="../assets/img/families.png" class="families-real">
      <img src="../assets/img/logo.png" class="families-logo">
      <div class="head-foot">
        <img src="../assets/img/English.png" alt="" class="coil">
        <div class="head-foot-div">
          <div class="foot-you"><b>听说你是工程狮</b></div>
          <hr class="foot-hr">
          <div class="foot-hearsay">江湖传闻你精通多门开发语言，身怀代码<br>绝技，<b>来！亮出来瞧瞧！</b></div>  
          <img src="../assets/img/mark.png" class="foot-mark">
        </div>   
          <img src="../assets/img/QR.png" class="foot-qrcode">
          <span class="foot-insert">扫码添加简历</span> 
      </div>
    </header>
    <!-- Logo结束 -->
    <!-- 主页面开始 -->
    <section>
      <div id="container">
        <div class="engineer engineer-first" v-for="(item,index) in content" :key="index">
          <div class="title" >{{item.category}}</div>
          <div class="triangle"></div>
          <div class="content">
            <div class="content-level">{{item.lOne}}</div>
            <div class="content-rmb">{{item.rmb}}</div>
            <div class="content-level">{{item.lTwo}}</div>
            <div class="content-rmb">{{item.thousand}}</div>
            <div class="content-img"><img src="../assets/img/circlecolor.png"/></div>
            <div class="content-level">{{item.lFisteen}}</div>
            <div class="content-rmbs">{{item.ten}}</div>
          </div>
        </div>
      </div>
      <div id="all">
        <div class="banner">学历工资津贴（统招不限专业）</div>
        <article>
          <div class="article-head">
            <div class="center">
              <div class="left"></div>
              <div class="right"></div>
              <div class="center-p"><p v-for="(item,index) in card" :key="index">{{item.education}}</p></div>
            </div>
          </div>
          <div class="article-foot">
            <p v-for="(item,index) in card" :key="index"><b>{{item.card}}</b></p>
          </div>
      </article>
      </div>
    </section>
    <!-- 主页面结束 -->
    <!-- 底部开始 -->
    <footer>
       <div class="footer-infor">
         <div class="infor-phone">
           <img src="../assets/img/phone.png"> <span>18633131117</span>
         </div>
         <div class="infor-website">
           <img src="../assets/img/website.png"> <span>www.allqj.com</span>
         </div>
         <div class="infor-address">
           <img src="../assets/img/GPS.png"> <span>唐山市路北区汇金中心B座8层</span>
         </div>
       </div>
       <div class="footer-foot">
         <span v-for="(item,index) in card" v-html='item.foot' :key="index">{{item.foot}}</span>
       </div>
    </footer>
    <!-- 底部结束 -->
  </div>
</template>

<script>
import lar from "@/assets/js/static.js"
export default {
  name: 'HelloWorld',
  data () {
    return {
      content:lar.content,
      card:lar.card
    }
  }
}
</script>

