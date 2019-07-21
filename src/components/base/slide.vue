<template>
  <el-carousel
    :interval="interval"
    :arrow="arrow"
    :initial-index="initialIndex"
    :autoplay="autoplay"
    :direction="directionType"
    :loop="loop"
    :trigger="trigger"
    :indicator-position="indicatorPosition"
    :type="slideType"
    @change="change"
    ref="carousel"
  >
    <slot name="slide-items"></slot>
    <!-- 
        <el-carousel-item class="slide-item" v-for="(item, index) in data" :key="index"></el-carousel-item>
    -->
  </el-carousel>
</template>

<script>
export default {
  props: {
    slideType: {
      type: String,
      default: ""
    },
    interval: {
      //  切换时间
      type: Number,
      default: 5000
    },
    arrow: {
      //  左右切换
      type: String,
      default: "never"
    },
    directionType: {
      //  方向
      type: String,
      default: "horizontal" //vertical
    },
    loop: {
      //  循环
      type: Boolean,
      default: true
    },
    autoplay: {
      //  是否自动切换
      type: Boolean,
      default: true
    },
    initialIndex: {
      //  初始状态激活幻灯片的索引
      type: Number,
      default: 0
    },
    trigger: {
      //  指示器触发方式
      type: String,
      default: "click"
    },
    //  指示器位置
    indicatorPosition: {
      type: String,
      default: "outside" ///none
    }
  },
  methods: {
    //   手动切换
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
    change(tag, ori) {
      this.$emit("currentIndexChange", tag);
    }
  }
};
</script>

<style lang='stylus' scoped></style>
