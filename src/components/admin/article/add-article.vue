<template>
  <div class="add-article.vue">
    <div class="dialog-wrap">
      <el-dialog title="添加文章" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <div class="top">
          <el-input placeholder="文章标题" v-model="article.title"></el-input>
          <el-date-picker
            v-model="article.createtime"
            type="datetime"
            @change="articleCreateTimeChange"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
          <!-- 类别选择 -->
          <el-select @change="articleTypeChange" v-model="article.type" placeholder="文章标签">
            <el-option-group
              v-for="(group, index) in articleTypeData"
              :key="index"
              :label="group.label"
            >
              <el-option
                v-for="(it,id) in group.options"
                :key="id"
                :label="it.label"
                :value="it.id"
              ></el-option>
            </el-option-group>
          </el-select>
          <!-- 置顶选择 -->
          <el-select @change="articleTopChange" v-model="article.top" placeholder="是否置顶">
            <el-option label="不置顶" value="0"></el-option>
            <el-option label="置顶" value="1"></el-option>
          </el-select>
        </div>

        <div class="middle">
          <el-input type="textarea" placeholder="文章描述" v-model="article.desc"></el-input>
          <editor ref="editor" @getEditorContent="getEditorContent"></editor>
        </div>

        <div class="footer">
          <div class="imgload-wrap">
            <img-load
              @uploadImageSuccess="articleBannerImgChange"
              action="http://localhost:9001/uploadArticleBannerImg"
            ></img-load>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitArticle">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { MessageBox, Notification } from "element-ui";
import { postArticleData } from "api/article.js";
import Editor from "components/admin/common/Editor.vue";
import ImgLoad from "components/admin/common/imgLoad.vue";
export default {
  props: ["articleTypeData"],
  data() {
    return {
      dialogVisible: false,
      article: {
        title: "",
        createtime: "",
        type: "",
        desc: "",
        content: "",
        bannerimg: "",
        top: ""
      }
    };
  },
  methods: {
    //  提交文章添加
    commitArticle() {
      // 富文本内容赋值
      this.$refs.editor.getContent();
      // 请求服务器添加数据
      postArticleData(this.article)
        .then(res => {
          if (res) {
            Notification({
              title: "添加文章",
              message: "文章添加成功",
              type: "success"
            });
            setTimeout(() => {
              this.dialogVisible = false;
            }, 1000);
          } else {
            Notification({
              title: "添加失败",
              message: "添加文章失败，请确定文章内容规范",
              type: "error"
            });
          }
        })
        .catch(err => {
          Notification({
            title: "添加失败",
            message: "添加文章失败，请确定文章内容规范",
            type: "error"
          });
        });
    },
    //  获得富文本内容
    getEditorContent(text) {
      this.article.content = this.$xss(text);
    },
    //  文章添加类别选中值发生变化
    articleTypeChange(val) {
      this.article.type = val;
    },
    //  文章添加时间选中值发生变化
    articleCreateTimeChange(val) {
      this.article.createtime = val;
    },
    //  文章置顶选择发送变化
    articleTopChange(val) {
      this.article.top = val;
    },
    //  文章添加焦点图变化
    articleBannerImgChange(response, file, filelist) {
      let fileListArray = [];
      filelist.forEach(item => {
        fileListArray.push(item.response.filename);
      });
      this.article.bannerimg = fileListArray.join("|");
    },
    handleClose(done) {
      MessageBox.confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  components: {
    Editor,
    ImgLoad
  }
};
</script>

<style lang='stylus' scoped>
.dialog-wrap {
  &>>>.el-dialog {
    .el-dialog__body {
      &>* {
        margin-bottom: 20px;
      }

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &>* {
          width: 22%;
        }
      }

      .middle {
        &>* {
          margin-bottom: 20px;
        }
      }

      .footer {
      }
    }
  }
}
</style>
