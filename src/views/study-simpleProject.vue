<template>
  <div class="study">
    <default :selectMenuIndex="menuLightText">
      <div class="main" slot="main">
        <div class="left-wrap">
          <article-list :data="articleData"></article-list>
          <!-- 分页器 -->
          <pagination
            @currentPageChange="currentPageChange"
            :currentPage="pagination.currentPage"
            :pagerCount="pagination.pagerCount"
            :totalCount="pagination.totalcount"
            :pageSize="10"
          ></pagination>
        </div>
        <div class="right-wrap hidden-xs-only" v-if="articleData.length">
          <!-- 推荐 -->
          <section class="section recommend">
            <panel-list PanelTitleTxt="特别推荐">
              <div class="content" slot="lists">
                <div class="recommend-item" v-for="(item,index) in recommendArticle" :key="index">
                  <div class="img">
                    <img src alt="1">
                  </div>
                  <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div
                      class="time"
                      v-if="index!=0"
                    >[{{ formatTime(new Date(item.createtime),false) }}]</div>
                  </div>
                </div>
              </div>
            </panel-list>
          </section>
          <!-- 点击排行 -->
          <section class="section click-rank">
            <panel-list PanelTitleTxt="点击排行">
              <div class="content" slot="lists">
                <div class="recommend-item" v-for="(item,index) in orderArticle" :key="index">
                  <div class="img">
                    <img src alt="1">
                  </div>
                  <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div
                      class="time"
                      v-if="index!=0"
                    >[{{ formatTime(new Date(item.createtime),false) }}]</div>
                  </div>
                </div>
              </div>
            </panel-list>
          </section>
        </div>
      </div>
    </default>
  </div>
</template>

<script>
import { getArticleData } from "api/article.js";
import { formatTime } from "common/js/util.js";
import Default from "./default.vue";
import ArticleList from "components/common/article-list.vue";
import Pagination from "components/common/pagination.vue";
import PanelList from "components/common/panel-list.vue";
export default {
  data() {
    return {
      articleData: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    //   页码变化回调
    currentPageChange(page) {
      console.log(page);
      this.getStyleListData();
    },
    //  请求获取数据
    getStyleListData() {
      getArticleData({
        currentPage: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        type: "3",
        keyword: "simpleproject"
      }).then(res => {
        this.articleData = res.data;
        this.pagination.totalcount = res.totalcount;
      });
    },
    _initMenuSelect() {
      this.menuLightText = "2-2";
    },
    formatTime(date, showTime) {
      return formatTime(date, showTime);
    }
  },
  computed: {
    //   特别推荐
    recommendArticle() {
      let tempArr = this.articleData.slice();
      return tempArr
        .filter(item => item.top)
        .filter((item, index) => index < 3);
    },
    // 点击排行
    orderArticle() {
      let tempArr = this.articleData.slice();
      return tempArr
        .sort((a, b) => {
          var value1 = a["seenum"];
          var value2 = b["seenum"];
          return value2 - value1;
        })
        .filter((item, index) => index < 5);
    }
  },
  components: {
    Default,
    ArticleList,
    Pagination,
    PanelList
  },
  created() {
    this._initMenuSelect();
    this.getStyleListData();
  },
  watch: {}
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.study {
  .main {
    display: flex;

    &>.left-wrap {
      flex: 1;
    }

    &>.right-wrap {
      width: 350px;
      margin-left: 20px;

      &>.section {
        margin-bottom: 20px;

        .content {
          .recommend-item {
            overflow: hidden;
            margin: 20px 0;
            height: 76px;
            display: flex;
            justify-content: space-between;

            &:hover {
              .img {
                overflow: hidden;

                img {
                  vertical-align: top;
                  transform: scale(1.3);
                }
              }
            }

            .img {
              width: 102px;
              margin-right: 10px;
              background: $color-border;

              img {
                transition: 0.3s;
              }
            }

            .info {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              line-height: 22px;

              .title {
                height: 42px;
                cursor: pointer;
                no-wrap-num(2);

                &:hover {
                  color: $color-main;
                }
              }

              .time {
                color: #ccc;
              }
            }

            &:nth-of-type(1) {
              height: 195px;
              position: relative;

              .img {
                width: 100%;
                height: 100%;
                margin-right: 0px;
              }

              .info {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 42px;
                background: rgba(0, 0, 0, 0.3);

                .title {
                  line-height: 42px;
                  padding: 0 10px;
                  box-sizing: border-box;
                  width: 100%;
                  color: #fff;
                  cursor: pointer;
                  no-wrap-num(1);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
