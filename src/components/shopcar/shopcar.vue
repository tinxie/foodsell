<template>
	<div>
		<div class="shopcar">
		<div class="content">
			<div class="content-left"  @click="totalList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">{{totalPrice}}元</div>
				<div class="desc">另需配送费{{deliveryprice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
			<div class="ball-container">
				<transition-group name="drop">
					<div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="index"></div>
				</transition-group>
			</div>
			<transition name="fold">
			<div class="shopcartlist" v-show="fold">
				<div class="listheader">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="(food,index) in selectedFoods" :key="index">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		    </transition>
		</div>
	</div>
	<transition name="fadelist">
		<div class="listmask" v-show="fold" @click="listHide"></div>
	</transition>
	</div>
</template>
<script type="text/ecmascript-6">
	import cartcontrol from '../cartcontrol/cartcontrol';
	import BScroll from 'better-scroll';
	export default {
	props: {
	// 储存选择的商品，vue中props数据类型为array或者object时，default要为函数，返回一个数组，包含了被选择的商品
	selectedFoods: {
	  type: Array,
	  default () {
	    return [
	    ];
	}
},
	  deliveryprice: {
	  type: Number,
	  default: 0
	},
	minprice: {
	type: Number,
	default: 0
}
},
data () {
  return {
   balls: [
     {show: false},
     {show: false},
     {show: false},
     {show: false},
     {show: false}
   ],
   fold: false
};
},
computed: {
	totalPrice () {
      // 使用count表示每个商品选择了多少个，此计算属性依赖于seleedFoods
      // 初始化总价为0
      let total = 0;
      this.selectedFoods.forEach((food) => {
        // 总价等于商品价格乘以count，count属性需要使用方法添加到food里面
        total += food.price * food.count;
  });
        return total;
},
totalCount () {
	// 商品选中次数
	let count = 0;
	this.selectedFoods.forEach((food) => {
	  count += food.count;
});
  return count;
},
payDesc () {
	// 总价为0时，显示一个起送价，总价不达标时，显示还差多少元起送，超标时，显示价格
	if (this.totalPrice === 0) {
	  return `￥${this.minprice}元起送`;
} else if (this.totalPrice < this.minprice) {
    let diff = this.minprice - this.totalPrice;
	return `还差${diff}元起送`;
} else {
	return `去结算`;
}
},
payClass () {
	if (this.totalPrice < this.minprice) {
	  return 'not-enougn';
} else {
	return 'enough';
}
}
},
watch: {
  totalCount: function () {
    if (!this.totalCount) {
    this.fold = false;
    return false;
}
},
   fold: function () {
    let show = this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
        });
      } else {
      this.scroll.refresh();
  }
    });
  }
  return show;
}
},
methods: {
drop () {
	
},
totalList () {
	if (!this.totalCount) {
	return;
}
this.fold = !this.fold;
},
empty () {
	this.selectedFoods.forEach((food) => {
        food.count = 0;
});
},
listHide () {
	this.fold = false;
},
pay () {
  if (this.totalPrice < this.minPrice) {
   return;
}
  alert(`支付${this.totalPrice}元`);
}
},
components: {
	cartcontrol: cartcontrol
}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
	.shopcar
	  height 48px
	  width 100%
	  position fixed
	  left 0
	  bottom 0
	  z-index 50
	  background black
	  .content
	    display flex
	    background #141d27
	    font-size 0
	    .content-left
	      flex 1
	      .logo-wrapper
	        display inline-block
	        position relative
	        top -10px
	        margin 0 12px
	        padding 6px
	        width 56px
	        height 56px
	        box-sizing border-box
	        vertical-align top
	        border-radius 50%
	        background #141d27
	        .logo
	          width 100%
	          height 100%
	          border-radius 50%
	          background #2b343c
	          text-align center
	          &.highlight
	            background: rgb(0, 160, 220)
	          .icon-shopping_cart
	            font-size 24px
	            line-height 44px
	            color #80858a
	            &.highlight
	              color: #fff
	        .num
	          position absolute
	          top 0
	          right 0
	          width 24px
	          height 16px
	          line-height 16px
	          text-align center
	          border-radius 16px
	          font-weight 700
	          font-size 9px
	          color #fff
	          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
	          background rgb(240,20,20)
	      .price
	        display inline-block
	        vertical-align top
	        margin-top 12px
	        line-height 24px
	        box-sizing border-box
	        padding-right 12px
	        border-right 1px solid rgba(255,255,255,0.1)
	        font-size 16px
	        font-weight 700
	        color rgba(255,255,255,.4)
	        &.highlight
	          color #fff
	      .desc
	        display inline-block
	        vertical-align top
	        margin 12px 0 0 12px
	        color rgba(255,255,255,0.4)
	        line-height 24px
	        color rgba(255,255,255,0.4)
	        font-size 10px
	    .content-right
	      width 105px
	      flex 0 0 105px
	      width 105px
	      .pay
	        height 48px
	        line-height 48px
	        text-align center
	        font-size 12px
	        font weight 700
	        color rgba(255,255,255,0.4)
	        background #2b333b
	        &.enough
	          background #00b43c
	          color #fff
	        &.not-enough
	          background #2b333b
	  .ball-container
	    .ball
	      position fixed
	      left 32px
	      bottom 22px
	      z-index 200
	      width 16px
	      height 16px
	      border-radius 50%
	      background rgb(0,160,220)
	    .drop-enter-active,.drop-leave-active
	      transition all 1s
	    .drop-enter,.drop-leave-to
	      color #fff
	   .shopcartlist
	     position absolute
	     left 0
	     top 0
	     font-size 20px
	     z-index -1
	     width 100%
	     transform translate3d(0,-100%,0)
	     .listheader
	       height 40px
	       line-height 40px
	       background  #f3f5f7
	       font-size 20px
	       padding 0 18px
	       border-bottom 1px solid rgba(7,17,27,0.1)
	       .title
	         float left
	         font-size 14px
	         color rgb(7,17,27)
	       .empty
	         float right
	         font-size 12px
	         color rgb(0,160,220)
	     .list-content
	       padding 0 18px
	       max-height 217px
	       background #fff
	       overflow hidden
	       .food
	         position relative
	         padding 12px 0
	         box-sizing border-box
	         border-1px(rgba(0,160,220,0.6))
	         .name
	           line-height 24px
	           font-size 14px
	           color rgb(7,17,27)
	         .price
	           position absolute
	           right 90px
	           bottom 12px
	           line-height 24px
	           font-size 14px
	           font-weight 700
	           color rgb(240,20,20)
	         .cartcontrol-wrapper
	           position absolute
               right 0
               bottom 6px
	   .fold-enter-active,.fold-leave-active
	     transition all 0.5s
	   .fold-enter,.fold-leave-to
	     transform translate3d(0,0,0)
	.listmask
	  position fixed
	  top 0
	  left 0
	  width 100%
	  height 100%
	  z-index 40
	  opacity 1
	  background rgba(7,17,27,0.6)
	  backdrop-filter blur(10px)
	.fadelist-enter-active,.fadelist-leave-active
      transition all 0.5s
    .fadelist-enter,.fadelist-leave-to
      opacity 0
      background rgba(7,17,27,0)  
 </style>