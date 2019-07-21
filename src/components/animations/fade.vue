<template>
  <div class="fade-component">
    <transition name="fadeFromBottom">
      <slot name="fadeFromBottom"></slot>
    </transition>

    <transition name="fadeFromRight">
      <slot name="fadeFromRight"></slot>
    </transition>

    <transition name="fadeFromTop">
      <slot name="fadeFromTop"></slot>
    </transition>

    <transition name="fadeFromLeft">
      <slot name="fadeFromLeft"></slot>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang='stylus' scoped>
.fadeFromBottom-enter-active, .fadeFromBottom-leave-active, .fadeFromLeft-enter-active, .fadeFromLeft-leave-active, .fadeFromRight-enter-active, .fadeFromRight-leave-active, .fadeFromTop-enter-active, .fadeFromTop-leave-active {
  transition: all 0.3s linear;
}

.fadeFromBottom-enter, .fadeFromBottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.fadeFromRight-enter, .fadeFromRight-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fadeFromTop-enter, .fadeFromTop-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.fadeFromLeft-enter, .fadeFromLeft-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
