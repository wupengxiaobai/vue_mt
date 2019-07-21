<template>
  <footer class="footer-component">
    <p>
      不为故事而生的红酒
      <router-link tag="small" to="/admin/login">━(*｀∀´*)ノ亻!</router-link>
    </p>
    <p>
      simple life
      <small>[简单生活]</small>
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.footer-component {
  text-align: center;
  width: 100%;
  height: 60px;
  font-size: $fs-xs;
  color: #fff;
  background: $color-menu;
  border-top: 1px solid $color-border;
  box-sizing: border-box;
  cursor: default;

  p {
    margin: 10px 0;

    &:nth-of-type(1) {
      small {
        cursor: pointer;
        transition: 0.5s;

        &:hover {
          color: $color-2;
        }
      }
    }

    &:nth-of-type(2) {
      color: $color-main;
    }
  }
}
</style>

