<template>
  <div class="pagination-component">
    <div class="pagination-wrap">
      <el-pagination
        :total="totalCount"
        :pager-count="pagerCount"
        :background="true"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="currentPageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 100
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      //   currentPage: 1
    };
  },
  methods: {
    setCurrentPage(page) {
      //   this.currentPage = page;
    },
    //   当前页码change回调
    currentPageChange(page) {
      //   this.currentPage = page;
      this.$emit("currentPageChange", page);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.pagination-component {
  .pagination-wrap {
    text-align: center;

    &>>>.el-pager {
      .number {
        background: #fff;

        &:hover {
          color: $color-main;

          &.active {
            color: #fff;
          }
        }

        &.active {
          background: $color-main;
        }
      }

      .el-icon {
        &.el-icon-d-arrow-right {
          color: $color-main;
        }

        &.el-icon-d-arrow-left {
          color: $color-main;
        }
      }
    }
  }
}
</style>
