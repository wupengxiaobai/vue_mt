<template>
  <div class="about">
    <default-layout selectMenuIndex="4">
      <div class="main-wrap" slot="main">
        <!-- 基础信息 -->
        <top-author></top-author>
        <!-- 自我介绍 -->
        <section class="section s1">
          <div class="title">
            <tip-title :text="'内心独白'">
              <span slot="icon" class="el-icon-edit"></span>
            </tip-title>
          </div>
          <div class="content">
            <p>我叫吴鹏，我是95后(1995/5/3)青年，学习web前端至今2年有余，说不上潜心修炼，大学有太多趣事，奈何我也是平凡之人，6月份多我即离校，内心甚有惶恐，可能是毕业的焦虑，其实从心里说一方面确实因为自己技术不够精湛，开发经验不多。另一方面是各大公司，对应职者要求都挺高，大家都想为社会贡献更大力量，开发高质量产品，这对社会的进步是有很大帮助的。以本人的现有技术及学历(大专)实不敢奢高薪职务，因为技不达薪而任职是危险的，不管是对团队还是个人而言。</p>
            <p>喜欢上前端是一种直觉。原来我是在大学就读“食品检验与生产”专业，读了一学期，活动参加得不少，有交际圈，之后发现自己确实和本专业没有太大缘分，我选择了“计算机网络”，希望大学是自己喜欢的感觉。代价就是以往经常来往的朋友慢慢地淡出了我的生活。在新环境下的学习也并非顺利，一学期的大范围折腾，我确定了学习最终方向 —— 前端。渐渐的花在校园内的课程中的心思也少了，不过成绩的优秀还是得保持，要求不高，如此有理由和时间学习更多。</p>
            <p>学习前端的路是曲折的。发现自己所学也并未得到实际的运用，以至于很多知识点是“学了忘”，所以一般我都会有mk笔记，以往为了能了解后端所以花时间学习PHP及ThinkPHP，嗯~ 三字形容非常贴切，说来也是趣事。</p>
            <p>因学习也为生活，能记录一些美好，所以现在我就写下这个博客网站，望收获: 记录值得、温故知新、分享！</p>
          </div>
          <div class="time">
            2019年5月20日
            <small>记</small>
          </div>
        </section>
        <section class="section s2">
          <div class="title">
            <tip-title :text="'空白档案'">
              <span slot="icon" class="el-icon-document"></span>
            </tip-title>
          </div>
        </section>
      </div>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from "./default.vue";
import TopAuthor from "components/about/top-author.vue";
import TipTitle from "components/common/tip-title.vue";

export default {
  components: {
    DefaultLayout,
    TopAuthor,
    TipTitle
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.about {
  overflow: hidden;

  .main-wrap {
    padding: 20px;
    background: #fff;
    box-shadow: 1px 1px 1px 1px $color-border;

    .section {
      padding: 20px;

      .title {
        margin-bottom: 10px;
        width: 120px;
      }

      &.s1 {
        .content {
          line-height: 1.5;
          text-align: justify;
        }

        .time {
          margin: 10px 10px 0 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
