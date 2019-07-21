<template>
  <div class="menu-three-component">
    <div v-for="(item, index) in data" :key="index">
      <el-menu-item :index="item.desc" v-if="!item.children.length">
        <router-link tag="div" to="/index">{{item.name}}</router-link>
      </el-menu-item>
      <el-submenu :index="item.desc" v-else>
        <template slot="title">{{ item.name }}</template>
        <el-menu-item :index="it.desc" v-for="(it,id) in item.children" :key="id">
          <template slot="title">
            <router-link tag="div" to="/study/accumulate">{{it.name}}</router-link>
          </template>
        </el-menu-item>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang='stylus' scoped>
.menu-three-component {
}
</style>
