<template>
  <div class="panel-title-component">
    <span class="textTxt">{{ textTxt }}</span>
  </div>
</template>

<script>
export default {
  props: {
    textTxt: {
      type: String,
      default: "标题文案"
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.panel-title-component {
  .textTxt {
    position: relative;
    display: inline-block;
    height: 35px;
    font-size: 18px;
    color: $color-text;
    font-weight: 600;
    transition: color 0.5s;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 80%;
      height: 2px;
      background-color: $color-text;
      transition: all 0.5s;
    }
  }
}
</style>
