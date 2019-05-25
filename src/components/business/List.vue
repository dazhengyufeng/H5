<template>
    <div>
        <!-- author:王泽通
        date:2019-02-27
        instructions:千家严选列表组件 -->
        <ul id="list">
                <li class="card"
                    v-for="(item,index) in articleList"
                    :key="index">
                    <a v-bind:href="item.article_url">
                        <div class="card-img">
                            <img v-bind:src="item.image_url"
                                 class="img">
                        </div>
                        <div class="card-font">
                            <p class="card-subject">{{item.title}}</p>
                            <p class="card-author" v-if="item.author">作者：{{item.author}}</p>
                        </div>
                    </a>
                </li>
            </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            // 需要提交给后台的model
            from: {
                "type":"news",
                "offset":1,
                "count":10
            }
        }
    },
    //与vuex中的getters关联
    computed:{
        ...mapGetters(["articleList"])
    },
    mounted(){
        // 获取列表
       this.getList()
    },
    methods:{
        /** 
         * @author liuguisheng
         * @date 2019-03-06 15:00
         * @information 获取图文列表
        */
        getList: function (){
            this.$store.dispatch('pageInit',this.from)
        }
    },
    
}
</script>