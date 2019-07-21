<template>
  <div class="life">
    <default :selectMenuIndex="menuLightText">
      <div class="main" slot="main">
        <!-- 文章列表 -->
        <article class="left-list">
          <article-list
            ref="article-list"
            :onhover="true"
            :data="articleListData"
            @changeCurrentIndex="changeCurrentIndex"
          ></article-list>

          <!-- 分页器 -->
          <pagination
            @currentPageChange="currentPageChange"
            :currentPage="currentPage"
            :pagerCount="pagination.pagerCount"
            :totalCount="pagination.totalcount"
            :pageSize="10"
          ></pagination>
        </article>
        <!-- 快速时间线 -->
        <article class="right-time hidden-xs-only" v-if="articleListData.length">
          <right-time
            :data="articleListData"
            :currentIndex="currentIndex"
            @changeCurrentIndex="changeCurrentIndex"
          ></right-time>
        </article>
      </div>
    </default>
  </div>
</template>

<script>
import { getArticleData } from "api/article.js";
import Default from "./default.vue";
import RightTime from "components/life/right-time.vue";
import ArticleList from "components/common/article-list.vue";
import Pagination from "components/common/pagination.vue";
export default {
  data() {
    return {
      menuLightText: "3-1",
      articleListData: [],
      currentIndex: 0,
      currentPage: 1,
      limit: 10,
      typename: "",
      pagination: {
        totalcount: 1,
        pagerCount: 5
      }
    };
  },
  methods: {
    //   页码改变
    currentPageChange(page) {
      getArticleData({
        currentPage: page,
        limit: this.limit,
        type: "2",
        keyword: this.typename
      }).then(res => {
        console.log("getArticleListData: ", res);
        this.articleListData = res.data;
        this.pagination.totalcount = res.totalcount;
      });
    },
    changeCurrentIndex(index, onscroll) {
      this.currentIndex = index;
      if (onscroll) {
        window.scrollTo(0, this.heightArr[index]);
      }
    },
    getArticleListData() {
      getArticleData({
        currentPage: this.currentPage,
        limit: this.limit,
        type: "2",
        keyword: this.typename
      }).then(res => {
        console.log("getArticleListData: ", res);
        this.articleListData = res.data;
        this.pagination.totalcount = res.totalcount;
      });
    },
    _initMenuSelect() {
      this.menuLightText = this.$route.params.type == "read" ? "3-1" : "3-2";
      this.typename =
        this.$route.params.type == "live" ? "生活如此简单" : "每日读书";
      this.getArticleListData();
    },
    _initArticleListHeightArr() {
      let heightArr = [];
      let items = this.$refs["article-list"].$el.children;
      items &&
        [].forEach.call(items, item => {
          heightArr.push(item.offsetTop);
        });
      this.heightArr = heightArr;
    }
  },
  components: {
    Default,
    RightTime,
    ArticleList,
    Pagination
  },
  created() {
    this.currentPage = 1;
    this._initMenuSelect();
    setTimeout(() => {
      this._initArticleListHeightArr();
    }, 30);
  },
  watch: {
    //    侦听路由变化
    $route(newV, oldV) {
      this.currentPage = 1;
      //    菜单选项高亮修改
      this.menuLightText = newV.params.type == "read" ? "3-1" : "3-2";
      this.typename =
        this.$route.params.type == "live" ? "生活如此简单" : "每日读书";
      //    数据请求
      this.getArticleListData();
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

@media screen and (max-width: 760px) {
  .life {
    .main {
      .left-list {
        margin-right: 0px !important;
      }
    }
  }
}

.life {
  .main {
    .left-list {
      margin-right: 220px;
    }

    .right-time {
      position: fixed;
      top: 80px;
      right: 10px;
      width: 210px;

      &>>>.el-timeline {
        .el-timeline-item {
          .el-timeline-item__content {
            h4 {
              cursor: pointer;
              no-wrap();
            }
          }

          .el-timeline-item__node {
            transition: 0.3s;
          }

          .el-timeline-item__wrapper {
            &>div {
              transition: 0.3s;
            }
          }

          &:hover, &.active {
            .el-timeline-item__node {
              background-color: $color-main;
            }

            .el-timeline-item__wrapper {
              &>div {
                color: $color-main;
              }
            }
          }
        }
      }
    }
  }
}
</style>
