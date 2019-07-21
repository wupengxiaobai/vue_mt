<template>
  <div class="top-author-component">
    <div class="avatar"></div>
    <div class="info">
      <div class="name">吴鹏</div>
      <div class="desc">
        95后，Web前端开发的小白。
        <br>积跬步以至千里
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.top-author-component {
  padding: 20px;
  margin-top: 20px;
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid $color-border;
    margin-right: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    line-height: 1.2;

    .name {
      font-size: $fs-l;
      font-weight: 700;
    }

    .desc {
      font-size: $fs-xm;
    }
  }
}
</style>
