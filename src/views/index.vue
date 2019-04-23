<template>
  <default>
    <div slot="main">
      <div class="main">
        <div class="container">
          <section class="s1">
            <!-- 菜单 -->
            <my-menu/>
            <!-- 焦点区 -->
            <my-banner/>
          </section>

          <section class="s2">
            <!-- 焦点区域 -->
            <my-s></my-s>
          </section>

          <!-- 其他信息 -->
          <section class="sn">
            <!-- 其他信息 -->
            <last-info></last-info>
          </section>
        </div>
      </div>
    </div>
  </default>
</template>

<script>
import myMenu from "components/index/menu.vue";
import myBanner from "components/index/banner.vue";
import myS from "components/index/s.vue";
import lastInfo from "components/index/lastinfo.vue";
import Default from "components/layouts/default.vue";
export default {
  components: {
    Default,
    myMenu,
    myBanner,
    myS,
    lastInfo
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.main {
  background: $color-main-background;
  margin-top: 20px;
  width: 100%;
  min-height: 300px;

  .s1 {
    display: flex;
  }
}
</style>
