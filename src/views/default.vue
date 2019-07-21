<template>
  <div class="default-layout">
    <!-- 头部 -->
    <base-header :selectMenuIndex="selectMenuIndex"></base-header>
    <!-- 主体内容 -->
    <div class="main">
      <slot name="main"></slot>
    </div>
    <!-- 浮动操作面板 -->
    <fade>
      <aside-bar @click="toTop" slot="fadeFromBottom" v-if="showAsideBarState"></aside-bar>
    </fade>
    <!-- 底部 -->
    <base-footer></base-footer>
  </div>
</template>

<script>
import Fade from "components/animations/fade.vue";
import BaseHeader from "components/common/header.vue";
import BaseFooter from "components/common/footer.vue";
import AsideBar from "components/common/asidebar.vue";

const SCROLL_MAX_TOP = 110;

export default {
  props: {
    selectMenuIndex: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      showAsideBarState: false
    };
  },
  methods: {
    toTop() {
      console.log(1);
      window.scrollTo(0, 0);
    },
    //   监听滚动条 改变
    onAslidStateChange() {
      let self = this;
      window.onscroll = function(e) {
        if (window.scrollY > SCROLL_MAX_TOP) {
          self.showAsideBarState = true;
        } else {
          self.showAsideBarState = false;
        }
      };
    }
  },
  components: {
    BaseHeader,
    BaseFooter,
    AsideBar,
    Fade
  },
  created() {
    this.onAslidStateChange();
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.default-layout {
  &>.main {
    padding: 20px;
    width: 100%;
    min-height: calc(100vh - 120px);
    background-color: $color-background;
    box-sizing: border-box;
  }
}
</style>
