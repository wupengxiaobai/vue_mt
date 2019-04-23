<template>
  <div class="m-geo">
    <i class="el-icon-location"></i>浙江省
    <router-link tag="el-button" class="changeCity" to="/changeCity">切换城市</router-link>
    <span>[</span>
    <span>北京</span>
    <span>杭州</span>
    <span>上海</span>
    <span>]</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.m-geo {
  .changeCity {
    font-size: 12px;
    padding: 2px 5px;
    background: transparent;
    border-color: #ddd;

    &:hover {
      color: $color-main;
    }
  }

  span {
    // display: inline-block;
    margin: 2px;
  }
}
</style>
