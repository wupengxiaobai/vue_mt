<template>
  <div class="index">
    <default-layout selectMenuIndex="1">
      <div class="main-wrap" slot="main">
        <!-- 左侧栏 -->
        <article class="left">
          <section class="section s1">
            <slide arrow="hover">
              <div slot="slide-items">
                <el-carousel-item v-for="(item, index) in 5" :key="index">{{ item }}</el-carousel-item>
              </div>
            </slide>
          </section>
          <section class="section s2">
            <!-- 主体部分 -->
            <article-list :data="articleData"></article-list>

            <!-- 分页器 -->
            <pagination
              @currentPageChange="currentPageChange"
              :currentPage="pagination.currentPage"
              :totalCount="pagination.totalcount"
              :pageSize="10"
            ></pagination>
          </section>
        </article>

        <!-- 右侧栏 -->
        <article class="right hidden-xs-only">
          <section class="section s1">
            <div class="top-panel" v-for="(item, index) in 2" :key="index">
              <div class="subtitle">简单生活</div>
              <div class="desc">安静地做一个安静地美男子</div>
              <div class="img"></div>
            </div>
          </section>

          <section class="section s2">
            <panel-list PanelTitleTxt="特别推荐">
              <div class="content" slot="lists">
                <div
                  class="recommend-item"
                  :style="bgImageStyl(item)"
                  v-for="(item,index) in 3"
                  :key="index"
                >
                  <div class="title">{{ '特别推荐标题文案' }}</div>
                  <div class="but">
                    <base-button :value="'阅读'"></base-button>
                  </div>
                </div>
              </div>
            </panel-list>
          </section>

          <section class="section s3">
            <panel-list PanelTitleTxt="推荐文章" v-if="recommendArticle.length">
              <div class="content" slot="lists">
                <div class="recommend-item" v-for="(item,index) in recommendArticle" :key="index">
                  <div class="img">
                    <img src :alt="item.title">
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

          <section class="section s4">
            <panel-list PanelTitleTxt="点击排行">
              <div class="content" slot="lists">
                <div class="recommend-item" v-for="(item,index) in orderArticle" :key="index">
                  <div class="img">
                    <img src alt="1">
                  </div>
                  <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="time" v-if="index!=0">[{{ formatTime(new Date(item.createtime),false) }}]</div>
                  </div>
                </div>
              </div>
            </panel-list>
          </section>

          <section class="section s5">
            <panel-list PanelTitleTxt="鸡汤汇集"></panel-list>
          </section>
        </article>
      </div>
    </default-layout>
  </div>
</template>

<script>
import { getArticleData } from "api/article.js";
import { formatTime } from "common/js/util.js";
import DefaultLayout from "./default.vue";
import Slide from "components/base/slide.vue";
import PanelList from "components/common/panel-list.vue";
import BaseButton from "components/base/button.vue";
import ArticleList from "components/common/article-list.vue";
import Pagination from "components/common/pagination.vue";
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
    currentPageChange(page) {
      console.log(page);
      this.pagination.currentPage = page;
      this.getArticleListData();
    },
    // 获取文章列表数据
    getArticleListData() {
      getArticleData({
        currentPage: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }).then(res => {
        console.log("getArticleListData: ", res);
        this.articleData = res.data;
        this.pagination.totalcount = res.totalcount;
      });
    },
    formatTime(date, showTime) {
      return formatTime(date, showTime);
    },
    bgImageStyl(item) {
      return item.img
        ? `background:url(${item.img}) no-repeat center/cover`
        : `background-color:#ccc`;
    }
  },
  computed: {
    recommendArticle() {
      return this.articleData.filter(item => item.top);
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
    DefaultLayout,
    Slide,
    PanelList,
    BaseButton,
    ArticleList,
    Pagination
  },
  created() {
    this.slideData = [{}];
    this.getArticleListData();
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.main-wrap {
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;

  &>.left {
    width: 100%;
    flex: 1;

    .section {
      width: 100%;
      margin-bottom: 20px;

      &.s1 {
        min-height: 360px;

        &>>>.el-carousel {
          height: 360px;

          .el-carousel__container {
            height: 100%;

            .el-carousel__item {
              background-color: $color-border;
            }
          }

          .el-carousel__arrow {
            font-size: 22px;
            font-weight: 800;
            border-radius: 10px;
            background-color: $color-menu;

            &:hover {
              color: $color-main;
            }
          }

          .el-carousel__indicators--outside {
            position: absolute;
            right: 0;
            bottom: 10px;
            transform: translate3d(10%, -50%, 0);

            .el-carousel__indicator {
              margin: 0 3px;
              padding: 0;
              width: 12px;
              height: 12px;
              border-radius: 6px;
              background: $color-menu;
              transition: 0.3s linear;

              &.is-active {
                width: 25px;
                background: $color-main;
              }

              .el-carousel__button {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  &>.right {
    margin-left: 20px;
    width: 350px;

    .section {
      margin-bottom: 20px;

      &.s1 {
        background: transparent;
        padding: 0px;
        min-height: 360px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-panel {
          position: relative;
          width: 100%;
          height: 170px;

          .subtitle {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 6px 10px;
            background: rgba(0, 0, 0, 0.7);
            font-size: 12px;
            display: block;
            color: #FFF;
            border-radius: 3px;
          }

          .desc {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 20px;
            color: #fff;
            display: block;
            font-weight: normal;
            font-size: 16px;
            background: rgba(0, 0, 0, 0.7);
            no-wrap();
          }

          .img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            transition: 0.3s;
            cursor: pointer;

            &:hover {
              background-color: transparent;
            }
          }
        }
      }

      &.s2 {
        .content {
          .recommend-item {
            position: relative;
            margin: 20px 0;
            height: 195px;
            display: flex;
            justify-content: start;
            align-items: center;
            flex-direction: column;
            color: #fff;

            &:hover {
              .but {
                border-color: $color-main;

                &>>>input[type='button'] {
                  color: $color-main;
                }
              }
            }

            .title {
              margin: 50px 0 10px;
            }

            .but {
              width: 82px;
              height: 26px;
              color: #fff;
              background: transparent;
              border: 1px solid #fff;
              border-radius: 13px;

              &>>>input[type='button'] {
                color: #fff;
                cursor: pointer;
              }
            }
          }
        }
      }

      &.s3, &.s4 {
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

      &.s4 {
        .content {
          .ranking-item {
            margin: 20px 0;
            height: 195px;
            border: 1px solid $color-border;
          }
        }
      }
    }
  }
}
</style>
