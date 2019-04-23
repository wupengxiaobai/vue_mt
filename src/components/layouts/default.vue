<template>
  <div>
    <my-header></my-header>
    <slot name="main"></slot>
    <my-footer></my-footer>
  </div>
</template>


<script>
import MyHeader from "components/public/header.vue";
import MyFooter from "components/public/footer.vue";
export default {
  components: {
    MyHeader,
    MyFooter
  }
};
</script>


<style lang="stylus" scoped>
.el-header {
  height: auto !important;
}

.el-main {
  overflow: inherit;
  padding: 10px 20px;
  background: #f8f8f8;
}

.el-footer {
  height: auto !important;
  background: #f8f8f8;
}
</style>

