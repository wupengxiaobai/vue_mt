<template>
  <div class="container">
    <div class="nav">
      <router-link to="waimai">美团外卖</router-link>
      <router-link to="movies">猫眼电影</router-link>
      <router-link to="hotel">美团酒店</router-link>
      <router-link to="home">名宿/公寓</router-link>
      <router-link to="merchant">商家入驻</router-link>
      <router-link to="gonyi">美团公益</router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.nav {
  margin: 20px auto 0;
  width: 640px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    &:nth-of-type(1):hover {
      color: $color-background-1;
    }

    &:nth-of-type(2):hover {
      color: $color-background-2;
    }

    &:nth-of-type(3):hover {
      color: $color-background-3;
    }

    &:nth-of-type(4):hover {
      color: $color-background-4;
    }

    &:nth-of-type(5):hover {
      color: $color-main;
    }

    &:nth-of-type(6):hover {
      color: $color-background-3;
    }
  }
}
</style>
