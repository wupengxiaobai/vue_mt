<template>
  <div class="header">
    <!-- 顶部栏 -->
    <top-bar></top-bar>
    <!-- 搜索栏 -->
    <search-bar></search-bar>
    <!-- 头部菜单 -->
    <top-nav/>
  </div>
</template>

<script>
import topBar from "./header/topBar/top-bar.vue";
import searchBar from "./header/searchBar/search-bar.vue";
import topNav from "./header/nav.vue";
export default {
  components: {
    topBar,
    searchBar,
    topNav
  }
};
</script>

<style lang="stylus">
.header {
  box-shadow: 0 2px 27px 0 rgba(0, 0, 0, 0.1);
}
</style>
