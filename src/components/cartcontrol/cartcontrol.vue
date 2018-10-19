<template>
	<div class="cartcontrol">
		<transition name="countAnimate">
			<div class="cart-descrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCount"></div>
	    </transition>
	    <transition name="countAnimate">
		    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		</transition>
		<div class="cart-add icon-add_circle" @click.stop="addCount"></div>
	</div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
	export default {
	props: {
	// 由于商品添加减少按钮的关联值是food里面的count，所以food一定要传进来
	food: {
      type: Object
        }
       },
    methods: {
       // 事件里把event传入，通过发布订阅模式将事件发生的目标event.target传给父组件
       addCount (event) {
       // 如果没有_constructed,就说明不是通过better-scroll自己派生的点击事件，直接返回。作用，可以阻止PC端连续触发两次点击事件
         if (!event._constructed) {
          return;
     };
      
          if (!this.food.count) {
          // 使用vue.set 为food添加count属性并制定默认值。
           Vue.set(this.food, 'count', 1);
             } else {
          this.food.count++;
          console.log(this.food.count);
     }
     this.$emit('cartAdd', event.target);
      },
   decreaseCount () {
   if (!event._constructed) {
          return;
     };
       if (this.food.count > 0) {
         this.food.count--;
   }
}
}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
	  font-size 0
	  .cart-add, .cart-descrease
	    display inline-block
	    padding 6px
	    font-size 24px
	    line-height  24px
	    color rgb(0,160,220)
	  .cart-count
	    display inline-block
	    vertical-align top
	    width 12px
	    padding-top 6px
	    line-height 24px
	    text-align center
	    font-size 10px
	    color rgb(147,153,159)
	    tranform translate3d(24px, 0px, 0px)
	  .cart-descrease
	    transform translate3d(0, 0, 0) rotate(0deg)
	  .countAnimate-enter-active, .countAnimate-leave-active
	    transition all 0.5s
	  .countAnimate-enter, .countAnimate-leave-to
	    opacity 0
	    transform: translate3d(24px, 0, 0) rotate(360deg);
</style>