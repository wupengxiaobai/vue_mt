<template>
  <div class="tip-title-component">
    <h2>{{ text }}</h2>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.tip-title-component {
  padding-bottom: 8px;
  border-bottom: 1px dotted $color-text;
  display: flex;
  align-items: center;
  justify-content: center;

  &>>>span {
    font-size: 18px;
  }

  h2 {
    margin-right: 10px;
  }
}
</style>
