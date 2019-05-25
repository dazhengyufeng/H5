<template>
    <div>
        <!-- author:王泽通
        date:2019-02-27
        instructions:千家严选响应式主页面 -->
        <scroller :on-infinite="infinite"
                  :on-refresh = "refresh"
                  ref="myscroller"
                  noDataText="———我是有底线的———"
                  class="scroller">
            <!-- 头部开始 -->
            <header class="scri-header">
                <Head></Head>
            </header>
            <!-- 头部结束 -->
            <!-- 内容开始 -->
            <section class="stri-section">
                <List></List>
            </section>
            <!-- 内容结束 -->
        </scroller>
    </div>
</template>
<script>
import List from "@/components/business/List"  //引入列表组件
import Head from "@/components/base/Head"      //引入头部组件
import { mapActions, mapState } from 'vuex'    //VuexAction，State
import { setTimeout } from 'timers';           //定时器
export default {
    data(){
        return{
            from: {
                "type":"news",
                "offset":1,
                "count":10
            }
        }
    },
    methods:{
        //下拉触发调取列表
        getList: function (){
            this.$store.dispatch('getArticleList',this.from)
        },
        // 下拉刷新
        refresh:function(){
            let self=this
            setTimeout(function(){
                self.$refs.myscroller.finishPullToRefresh()
            },1200)
            this.getList()
        },
        // 上拉加载
        infinite:function(){
            this.from.count+=5
            setTimeout(()=>{
                this.$refs.myscroller.finishInfinite(true);
            },1200)
            this.getList()
        },
    },
    components:{
        List,
        Head,
    }
}
</script>