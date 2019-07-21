<template>
  <div class="article-list-component" v-if="data.length">
    <div
      class="article-item"
      v-for="(item,index) in data"
      :key="index"
      @mouseenter="changeCurrentIndex(index)"
    >
      <div class="art-title">{{ item.title }}</div>
      <div class="art-content">
        <div class="img">
          <img src :alt="item.title">
        </div>
        <div class="info">
          <div class="description">{{ item.desc }}</div>
          <div class="msg">
            <div class="name">
              <span class="icon el-icon-house"></span>
              [{{ item.name }}]
            </div>
            <div class="time">
              <span class="icon el-icon-time"></span>
              {{formatTime(new Date(item.createtime),false)}}
            </div>
            <div class="rednum">
              <span class="icon el-icon-view"></span>
              {{item.seenum}}
            </div>
            <div class="favoritenum">
              <span class="icon"></span>
              {{item.favoritenum }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    onhover: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeCurrentIndex(index) {
      if (this.onhover) {
        this.$emit("changeCurrentIndex", index);
      }
    },
    formatTime(date, showTime) {
      return formatTime(date, showTime);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

@media screen and (max-width: 450px) {
  .article-list-component {
    .article-item {
      .art-content {
        .info {
          .msg {
            &>div {
              &:nth-of-type(4) {
                display: none !important;
              }
            }
          }
        }
      }
    }
  }
}

.article-list-component {
  .article-item {
    margin-bottom: 20px;
    padding: 30px 20px;
    background: #fff;
    box-sizing: border-box;
    transition: 0.3s;

    &:hover {
      box-shadow: 1px 1px 3px 1px $color-border;

      .art-title {
        color: $color-main;
      }
    }

    .art-title {
      margin-bottom: 10px;
      font-size: $fs-xl;
      font-weight: 700;
      line-height: 1.2;
      cursor: pointer;
      transition: 0.3s;
    }

    .art-content {
      overflow: hidden;
      display: flex;
      height: 150px;

      .img {
        overflow: hidden;
        width: 190px;
        height: 150px;
        margin-right: 20px;
        cursor: pointer;
        background-color: $color-border;

        &:hover {
          img {
            transform: scale(1.2);
          }
        }

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
          transition: 0.5s;
        }
      }

      .info {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        // justify-content: start;
        .description {
          margin-top: 5px;
          font-size: 14px;
          height: 60px;
          line-height: 1.5;
          no-wrap-num(3);
        }

        .msg {
          font-size: 13px;
          color: $color-menu;
          display: flex;
          flex-wrap: wrap;

          &>div {
            margin-right: 10px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;

            span {
              width: 13px;
              height: 13px;
              margin-right: 5px;
              border: 1px solid $color-border;
            }
          }
        }
      }
    }
  }
}
</style>
