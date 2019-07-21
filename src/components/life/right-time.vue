<template>
  <div class="right-time-component">
    <el-timeline>
      <el-timeline-item
        :class="{'active':currentIndex == index}"
        v-for="(item,index) in data"
        :key="index"
        :timestamp="formatTime(new Date(item.createtime))"
        placement="top"
      >
        <h4 @click="changeCurrentIndex(index)" :title="item.title">{{ item.title }}</h4>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { formatTime } from "common/js/util.js";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timestamp: ""
    };
  },
  methods: {
    changeCurrentIndex(index) {
      this.$emit("changeCurrentIndex", index, true);
    },
    formatTime(date, showTime) {
      return formatTime(date, showTime);
    }
  }
};
</script>

<style lang='stylus' scoped>
.right-time-component {
}
</style>
