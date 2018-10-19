<template>
<div id="app">
<!-- 下面通过vue-router获得数据seller之后，将seller变量通过Prop传给header组件,这里定义了自定义属性之后，
要去编写header组件 -->
   <v-header :seller="seller"></v-header>
     <div class="tab border1px">
       <div class="tab-item"><router-link to="/goods">商品</router-link></div>
       <div class="tab-item"> <router-link to="/ratings">评论</router-link></div>
       <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
   </div>
   <keep-alive>
     <router-view :seller="seller"></router-view>
   </keep-alive>
   </div>
</template>
<script>
import header from './components/header/header.vue';
import {urlParse} from '../src/common/js/util.js';
const ERR_OK = 0;
export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
     },
     created () {
       this.$http.get('/api/seller?id=' + this.seller.id).then((responce) => {
         responce = responce.body;
         if (responce.errno === ERR_OK) {
           this.seller = Object.assign({}, this.seller, responce.data);
           console.log(this.seller.id);
         }
       }).catch(err => {
         console.log(err);
       });
     },
      components: {
      'v-header': header
      }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
   @import "./common/stylus/mixin.styl"
   .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
         flex 1
         text-align center
         & > a
           display block
           font-size 14px
           color rgb(77,85,93)
           &.active
             color rgb(240,20,20)
</style>