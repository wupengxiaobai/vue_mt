<template>
  <div class="login">
    <div class="login-wrap">
      <div class="title">博客登录</div>
      <el-input placeholder="邮箱" type="email" v-model="email" clearable></el-input>
      <el-input placeholder="密码" type="password" v-model="pass" clearable></el-input>
      <p>
        <small @click="dialogVisible=true">没有账号？快速注册</small>
      </p>
      <br>
      <el-button @click.stop="commitLogin">登录</el-button>
    </div>

    <el-dialog
      class="dialog"
      title="快速注册"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <div class="main">
        <el-input placeholder="邮箱" v-model="registerEmail" clearable></el-input>
        <el-input placeholder="密码" type="password" v-model="registerPassword" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="commitRegister"
        >{{ commitRegisterText }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox, Notification } from "element-ui";
export default {
  data() {
    return {
      email: "",
      pass: "",
      registerEmail: "",
      registerPassword: "",
      loading: false,
      commitRegisterText: "注册",
      dialogVisible: false
    };
  },
  methods: {
    // 提交登录
    commitLogin() {
      this.$axios
        .post("/users/login", { email: this.email, password: this.pass })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            Notification({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({
                path: "/admin/index"
              });
            }, 1000);
          } else {
            Notification({
              title: "失败",
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log("commitLogin 请求出错", err);
        });
    },
    // 提交注册指令
    commitRegister() {
      this.commitRegisterText = "请稍后";
      this.loading = true;

      this.$axios
        .post("/users/register", {
          email: this.registerEmail,
          password: this.registerPassword
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            Notification({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });

            setTimeout(() => {
              this.dialogVisible = false;
            }, 300);
          } else {
            Notification({
              title: "失败",
              message: res.data.msg,
              type: "error"
            });
          }

          this.commitRegisterText = "注册";
          this.loading = false;
        })
        .catch(err => {
          console.log("commitRegister 请求出错", err);
        });
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  },
  created() {
    this.$confirm = MessageBox;
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.login {
  .login-wrap {
    margin: 100px auto 0;
    padding: 20px;
    width: 320px;
    border: 1px solid $color-border;

    &>* {
      margin-bottom: 10px;
    }

    .title {
      margin-bottom: 20px;
      font-size: $fs-l;
    }

    small {
      float: right;
      cursor: pointer;

      &:hover {
        color: $color-main;
      }
    }

    button {
    }
  }

  .dialog {
    .main {
      &>* {
        margin-bottom: 10px;
      }
    }

    &>>>.el-dialog__body {
      padding-bottom: 0;
    }
  }
}
</style>
