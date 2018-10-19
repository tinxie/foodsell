<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
      	<ul>
      		<li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current': currentY === index}">
      			<span class="text">
      				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>>{{item.name}}
      			</span>
      		</li>
      	</ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
      	<ul>
      		<li v-for="(item,index) in goods" :key= "index" class='foods-height-hook'>
      			<h1 class="title">{{item.name}}</h1>
      			<ul>
      				<li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index" @click="selectedFoodDetail(food,$event)">
      					<div class="icon">
      						<img :src="food.icon" alt="" width="57" height="57">
      					</div>
      					<div class="content">
      						<h2 class="name">{{food.name}}</h2>
      						<p class="desc">{{food.description}}</p>
      						<div class="extra">
      							<span class="count">月售{{food.sellCount}}份</span>
      							<span>好评率{{food.rating}}%</span>
      						</div>
      						<div class="price">
      							<span class="now">￥{{food.price}}</span>
      							<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
      						</div>
      						<div class="cartcontrol-wrapper">
      							<cartcontrol :food="food" @cartAdd="_drop"></cartcontrol>
      						</div>
      					</div>
      				</li>
      			</ul>
      		</li>
      	</ul>
      </div>
        <food :food="selectfood" ref="food"></food>
      <shopcar :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice" :selectedFoods="selectedFoods" ref="shopcart"></shopcar>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcar from '../shopcar/shopcar';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';
const ERR_OK = 0;
 export default { 
   props: {
     seller: {
       type: Object
 }
},

  data () {
    return {
      goods: [],
      // 存放高度右侧每个区块的高度
      listHeight: [],
      // 记录Y值,跟踪变化
      Y: 0,
      selectfood: {}
};
},
computed: {
   currentY () {
       // 计算Y值在右侧的高度区间，利用高度数组index与左侧列表index关联，在dom中通过判断两者相等改变目标class值
  let height = this.listHeight;
  for (let i = 0; i < height.length; i++) {
    let height1 = height[i];
    let height2 = height[i + 1];
    if (!height2 || (this.Y >= height1 && this.Y < height2)) {
        return i;
}
}
return 0;
},
  selectedFoods () {
     let foods = [];
     this.goods.forEach((good) => {
       good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
      };
   });
 });
 return foods;
 }
},
created () {
  this.classMap = ['descrease', 'discount', 'special', 'invoice', 'guarantee'];

  this.$http.get('/api/goods').then((response) => {
    response = response.body;
    if (response.errno === ERR_OK) {
      this.goods = response.data;
      this.$nextTick(() => {
        this._init_Scroll();
        this._calculatorHeight();
  });
};
});
},
  methods: {
    _init_Scroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      click: true
  });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      // 监听Y值方法
        click: true,
        probeType: 3
  });
     this.foodsScroll.on('scroll', (pos) => {
       //  右侧列表滚动时获取Y值，正整数
       this.Y = Math.abs(Math.round(pos.y));
 });
 },
   _calculatorHeight () {
   // 计算每个区块的累加高度并放入数组
     let height = 0;
     this.listHeight.push(height);
     let foodsHeight = this.$refs.foodsWrapper.getElementsByClassName('foods-height-hook');
     for (let i = 0; i < foodsHeight.length; i++) {
       let item = foodsHeight[i];
       height += item.clientHeight;
       this.listHeight.push(height);
 }
},

_drop (target) {
   this.$refs.shopcart.drop(target);
},
selectedFoodDetail (food, event) {
  if (!event._constructed) {
   return;
}
 this.selectfood = food;
 console.log('oo' + this.selectfood);
 this.$refs.food.show();
}
},
  components: {
    shopcar,
    cartcontrol,
    food
}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    bottom 46px
    top 174px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 50px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          background rgb(255,255,255)
          font-weight 700
          margin-top -1px
          z-index 10
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          font-size 12px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px 
            font-size 14px
            color rgb(7,17,27)
          .desc, .extra
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            line-height 10px
            &.count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 10px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>