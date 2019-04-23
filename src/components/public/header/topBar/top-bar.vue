<template>
  <div class="topBar">
    <div class="container">
      <div class="left">
        <!-- 城市服务 -->
        <geo/>
        <!-- 用户操作 -->
        <user/>
      </div>
      <!-- 右侧导航 -->
      <t-nav/>
    </div>
  </div>
</template>

<script>
import geo from "./geo.vue";
import user from "./user.vue";
import tNav from "./t-nav.vue";
export default {
  components: {
    geo,
    user,
    tNav
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.topBar {
  position: relative;
  z-index: 1;
  width: 100%;
  line-height: 40px;
  height: 40px;
  color: $color-main-text;
  font-size: 12px;
  background: $color-main-background;

  .container {
    display: flex;
    justify-content: space-between;

    .left {
      width: 400px;
      display: flex;
    }
  }
}
</style>
