<template>
  <div class="panel-list-component">
    <panel-title :textTxt="PanelTitleTxt"></panel-title>
    <slot name="lists"></slot>
  </div>
</template>

<script>
import PanelTitle from "components/common/panel-title.vue";
export default {
  props: {
    PanelTitleTxt: {
      type: String,
      default: ""
    }
  },
  components: {
    PanelTitle
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.panel-list-component {
  background: #fff;
  padding: 30px;

  .lists {
    position: relative;
  }

  &:hover {
    &>>>.textTxt {
      color: $color-main;

      &::after {
        width: 110%;
        background: $color-main;
      }
    }
  }
}
</style>
