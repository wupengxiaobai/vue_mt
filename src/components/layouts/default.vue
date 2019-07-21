<template>
  <div class="default">
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


<style lang="stylus" scoped></style>

