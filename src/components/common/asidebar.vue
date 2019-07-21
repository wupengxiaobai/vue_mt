<template>
  <div @click="toTop" class="aside-component" title="顶部呀 (#^.^#)">
    <div class="to-top"></div>
    <div class="topicon"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 0
    };
  },
  methods: {
    toTop() {
      let daley = 50;
      this.timer = setInterval(() => {
        let scrollY = window.scrollY - daley;
        if (scrollY < 0) {
          scrollY = 0;
          clearInterval(this.timer);
        }
        window.scrollTo(0, scrollY);
      }, 10);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.aside-component {
  overflow: hidden;
  position: fixed;
  bottom: 55px;
  right: 55px;
  width: 45px;
  height: 45px;
  border: 1px solid $color-border;
  background-color: $color-main;
  box-shadow: 1px 1px 1px 0.1px $color-border;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  flex-direction: column;

  .to-top, .topicon {
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-bottom-color: transparent;
    border-right-color: transparent;
    transform: rotate(45deg) translate3d(50%, 50%, 0);
    transition: 0.6s;
  }

  .topicon {
    transform: rotate(45deg) translate3d(120%, 120%, 0);
    transition: 0.3s;
  }

  &:hover {
    box-shadow: 1px 1px 1px 0.1px transparent;

    .to-top {
      transform: rotate(45deg) translate3d(28%, 28%, 0);
    }

    .topicon {
      transform: rotate(45deg) translate3d(10%, 10%, 0);
    }
  }
}
</style>
