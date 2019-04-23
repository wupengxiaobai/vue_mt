<template>
  <div class="user">
    <template v-if="user">
      欢迎您,
      <span class="username">{{ user }}</span>
    </template>
    <template v-else>
      <router-link tag="div" to="/login" class="login">立即登录</router-link>
      <router-link tag="div" to="/register" class="register">注册</router-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.user {
  display: flex;
  margin-left: 28px;

  .username {
    color: $color-main;
  }

  .login {
    color: $color-main;
    cursor: pointer;
  }

  .register {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
