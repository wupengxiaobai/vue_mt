<template>
  <div class="admin-index">
    <admin-default :selectMenuIndex="'1'">
      <div slot="main">首页</div>
    </admin-default>
  </div>
</template>

<script>
import AdminDefault from "./default.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    AdminDefault
  }
};
</script>

<style lang='stylus' scoped>
.admin-index {
}
</style>
