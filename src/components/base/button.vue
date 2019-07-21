<template>
  <div class="button-component">
    <input :class="[btnCls,{'bold':boldBool}]" type="button" :value="value">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "默认文案"
    },
    sizeStr: {
      type: String,
      default: "normal"
    },
    boldBool: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnCls() {
      if (this.sizeStr) {
        return this.sizeStr;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.button-component {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input[type='button'] {
    border: none;
    outline: none;
    background-color: transparent;

    &.bold {
      font-weight: bolder;
    }

    &.normal {
      font-size: $fs-m;
    }

    &.middle {
      font-size: $fs-l;
    }

    &.bigger {
      font-size: $fs-xl;
    }
  }
}
</style>
