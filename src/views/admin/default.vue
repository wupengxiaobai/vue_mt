<template>
  <div class="admin-default">
    <div class="nav-bar">
      <div class="vertical-menu-wrap">
        <el-menu
          :default-active="selectMenuIndex"
          class="el-menu-vertical"
          @select="handleSelect"
          background-color="#fff"
          text-color="#333"
          active-text-color="#658FF7"
        >
          <el-menu-item index="1">
            <router-link tag="span" to="/admin/index" slot="title">后台管理</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link tag="span" to="/admin/article" slot="title">文章管理</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectMenuIndex"],
  data() {
    return {};
  },
  methods: {
    handleSelect() {}
  }
};
</script>

<style lang='stylus' scoped>
.admin-default {
  display: flex;

  .nav-bar {
    width: 220px;
    height: 100vh;

    &>>>.el-menu {
      border-right: 1px solid transparent;
    }
  }

  .main {
    padding: 20px;
    flex: 1;
  }
}
</style>
