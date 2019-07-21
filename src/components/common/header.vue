<template>
  <header class="header-component">
    <div class="header">
      <div title="小白红酒的博客站" class="logo">
        小白
        <small>❥</small>
        <span>博客</span>
      </div>
      <!-- 水平菜单 -->
      <el-menu
        :default-active="selectMenuIndex"
        class="el-menu-demo hidden-xs-only"
        @select="handleSelect"
        :mode="mode"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="gold"
        slot="menu-three"
      >
        <el-menu-item index="1">
          <router-link tag="div" to="/index">HomePage</router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">技术学习区</template>
          <el-menu-item index="2-1">
            <template slot="title">
              <router-link tag="div" to="/study/accumulate">日积月累</router-link>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <router-link tag="div" to="/study/simpleProject">SimpleProject</router-link>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">生活驿站</template>
          <el-menu-item index="3-1">
            <router-link tag="div" to="/life/read">每日读书</router-link>
          </el-menu-item>
          <el-menu-item index="3-2">
            <router-link tag="div" to="/life/live">生活如此简单</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <router-link tag="div" to="/about">关于小白</router-link>
        </el-menu-item>
      </el-menu>

      <div class="search hidden-md-and-down">
        <!-- 搜索区域 -->
        <el-input placeholder="请输入内容" v-model="searchInp">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <!-- 菜单图标 -->
      <div class="menu-icon hidden-sm-and-up">
        <span
          class="el-icon-menu"
          :class="[{'on':verticalMenuState==true}]"
          @click="changeVerticalMenu"
        ></span>
      </div>

      <!-- 垂直菜单 -->
      <fade>
        <div
          class="vertical-menu-wrap hidden-sm-and-up"
          slot="fadeFromLeft"
          v-if="verticalMenuState"
        >
          <!-- 
            @open="handleOpen"
          @close="handleClose"-->
          <el-menu
            :default-active="selectMenuIndex"
            class="el-menu-vertical"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <router-link tag="span" to="/index" slot="title">HomePage</router-link>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">技术学习区</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <router-link tag="span" to="/study/accumulate" slot="title">日积月累</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link tag="span" to="/study/simpleproject" slot="title">SimpleProject</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">生活驿站</template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <router-link tag="span" to="/life/read" slot="title">每日读书</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <router-link tag="span" to="/life/live" slot="title">生活如此简单</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <router-link tag="span" to="/about" slot="title">关于小白</router-link>
            </el-menu-item>

            <el-menu-item class="search">
              <!-- 搜索区域 -->
              <el-input placeholder="请输入内容" v-model="searchInp">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-menu-item>
          </el-menu>

          <div @click.stop="verticalMenuState = false" class="cover"></div>
        </div>
      </fade>
    </div>
  </header>
</template>

<script>
import Fade from "components/animations/fade.vue";
import MenuThree from "components/common/menu-three.vue";
import { getMenuData } from "api/menu.js";
import { setTimeout } from "timers";
export default {
  props: {
    selectMenuIndex: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      mode: "horizontal",
      verticalMenuState: false,
      searchInp: "",
      menuData: []
    };
  },
  methods: {
    changeVerticalMenu() {
      this.verticalMenuState = !this.verticalMenuState;
    },
    //   菜单选择
    handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    // 处理获得需要格式的菜单数据
    _normalizeMenuData(arr) {
      let tempArr = [];

      for (let key in arr) {
        if (arr[key].pid == 0) {
          arr[key].children = [];
          tempArr.push(arr[key]);
        }
        for (let key2 in tempArr) {
          if (tempArr[key2].id == arr[key].pid) {
            arr[key].children = [];
            tempArr[key2]["children"].push(arr[key]);
          }
          let tempArr2 = tempArr[key2]["children"];
          for (let key3 in tempArr2) {
            if (arr[key].pid == tempArr2[key3].id) {
              arr[key].children = [];
              tempArr2[key3]["children"].push(arr[key]);
            }
          }
        }
      }

      //   console.log("菜单数据--", tempArr);
      return tempArr;
    }
  },
  created() {
    //   获取处理后赋值菜单数据
    getMenuData().then(res => {
      this.menuData = this._normalizeMenuData(res);
    });
  },
  components: {
    Fade,
    MenuThree
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl';

.header-component {
  width: 100%;

  .header {
    position: relative;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-menu;

    .logo {
      margin-left: 20px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      color: $color-main;
      border-bottom-color: transparent;

      small {
        color: $color-1;
      }

      span {
        margin-left: 5px;
        color: $color-background;
      }
    }

    &>.el-menu {
      height: 60px;
      margin-left: 60px;
      flex: 1;
      border-right: none;

      &.el-menu--horizontal {
        border-bottom: none;
      }
    }

    &>.search {
      margin-right: 20px;
      width: 220px;

      &:hover {
        background: transparent !important;
      }
    }

    .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: $color-main;
    }

    .menu-icon {
      margin-right: 20px;
      flex: 1;
      width: 50px;
      cursor: pointer;
      text-align: right;

      span {
        width: 32px;
        height: 32px;
        font-size: 32px;
        color: #fff;

        &.on {
          color: $color-main;
        }
      }
    }

    .vertical-menu-wrap {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      display: flex;

      .el-menu-vertical {
        width: 220px;
        height: calc(100vh - 60px);

        .search {
          &:hover {
            background: transparent !important;
          }
        }
      }

      .cover {
        flex: 1;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
