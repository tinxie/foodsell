<template>
	<div>
		<div class="ratingselect">
			<div class="rating-type">
				<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span>{{ratings.length}}</span></span>
				<span class="block positive" :class="{'active':selectType===0}"  @click="select(0,$event)">{{desc.positive}}<span>{{positives.length}}</span></span>
				<span class="block positive negative" :class="{'active':selectType===1}"  @click="select(1,$event)">{{desc.negative}}<span>{{nevatives.length}}</span></span>
			</div>
			<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
				<span class="icon-check_circle"></span>
				<span class="text">只看有内容的评价</span>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	// 代表正面评价，负面评价和所有，使用常量表示可以增加代码可读性
	   const ALL = 2;
	   const POSITIVE = 0;
	   const NEGATIVE = 1;
      
	export default {
      props: {
        ratings: {
          type: Array,
          // 默认是函数，返回一个数组
          default () {
            return [];
      }
    },
   
   desc: {
   // 描述默认为对象，返回一个对象，里面有三个key,全部，满意和不满意
     type: Object,
     default () {
      return {
        all: '全部',
        positive: '满意',
        negative: '不满意'
  };
 }
}
  },
  data () {
    return {
     selectType: {
    // 类型是数字，默认选择所有
      type: Number,
      default: ALL
},
    onlyContent: {
      type: Boolean,
      default: false
}
};
},
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return;
  }
      this.selectType = type;
      this.$emit('ratingtypeselect', type);
},
    toggleContent (event) {
       if (!event._constructed) {
       return;
   }
   this.onlyContent = !this.onlyContent;
   this.$emit('contenToggle', this.onlyContent);
}
},
computed: {
	positives () {
      //  利用计算属性通过过滤数组拿到rateType = 0的值
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
  });
},
   nevatives () {
     return this.ratings.filter((rating) => {
       return rating.rateType === NEGATIVE;
 });
}
}
};
</script>
<style rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/mixin.styl';
	.ratingselect
	  .rating-type
	    padding 18px 0
	    margin 0 18px
	    border-1px(rgba(7,17,27,0.1))
	    font-size 0
	    .block
	      display inline-block
	      padding 8px 12px
	      margin-right 8px
	      border-radius 1px
	      font-size 12px
	      color rgb(77,85,93)
	      &.active
	        color #fff
	      .count
	        font-size 8px
	        margin-left 2px
	        line-height 16px
	      &.positive
	        background rgba(0,160,220,0.2)
	        &.active
	          background rgb(0,160,220)
	      &.negative
	        background rgba(77,85,93,0.2)
	        &.active
	          background rgb(77,85,93)  
	  .switch
	    padding 12px 18px
	    line-height 24px
	    border-bottom 1px solid rgba(7,17,27,0.1)
	    color rgb(147,153,159)
	    font-size 0
	    &.on
	      .icon-check_circle
	        color #00c850
	    .icon-check_circle
	      display inline-block
	      vertical-align top
	      margin-right 4px
	      font-size 24px
	    .text
	      display inline-block
	      vertical-align top
	      font-size 12px
</style>