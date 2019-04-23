<template>
  <div>
    <input @focus="onFocus" @blur="onBlur" v-model="query" type="text" :placeholder="placeholder">
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  props: {
    placeholder: {
      type: String,
      default: "placeholder"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    //   获得焦点
    onFocus() {
      this.$emit("onFocus");
    },
    //  失去焦点
    onBlur() {
      this.$emit("onBlur");
    }
  },
  created() {
    //   防抖处理监听输入框内容变化
    this.$watch(
      "query",
      debounce(() => {
        this.$emit("onQueryChange", this.query);
      }, 300)
    );
  }
};
</script>

<style lang="stylus" scoped>
input {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

