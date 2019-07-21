<template>
  <div class="edit-article-component">
    <!-- 修改文章 -->
    <div class="dialog-wrap">
      <el-dialog
        title="编辑文章"
        :visible.sync="editDialogVisible"
        width="80%"
        :before-close="handleClose"
      >
        <div class="top">
          <el-input placeholder="文章标题" v-model="editArticleData.title"></el-input>
          <el-date-picker
            v-model="editArticleData.createtime"
            type="datetime"
            @change="editArticleCreateTimeChange"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
          <!-- 类别选择 -->
          <el-select
            @change="editArticleTypeChange"
            v-model="editArticleData.article_type_id"
            placeholder="文章标签"
          >
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
          <el-select
            @change="editArticleTopChange"
            v-model="editArticleData.top"
            placeholder="是否置顶"
          >
            <el-option label="不置顶" :value="0"></el-option>
            <el-option label="置顶" :value="1"></el-option>
          </el-select>
          <!-- 文章状态 -->
          <el-select
            @change="editArticleStateChange"
            v-model="editArticleData.articlestate"
            placeholder="文章状态选择"
          >
            <el-option label="删除(隐藏)" :value="0"></el-option>
            <el-option label="正常(显示)" :value="1"></el-option>
          </el-select>
        </div>

        <div class="middle">
          <el-input type="textarea" placeholder="文章描述" v-model="editArticleData.desc"></el-input>
          <editor
            ref="editor2"
            :initContent="editArticleData.content"
            @getEditorContent="editGetEditorContent"
          ></editor>
        </div>

        <div class="footer">
          <div class="imgload-wrap">
            <img-load
              @uploadImageSuccess="editArticleBannerImgChange"
              action="http://localhost:9001/uploadArticleBannerImg"
            ></img-load>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitEditArticle">修改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { MessageBox, Notification } from "element-ui";
import { postEditArticleData } from "api/article.js";
import Editor from "components/admin/common/Editor.vue";
import ImgLoad from "components/admin/common/imgLoad.vue";
export default {
  props: ["editArticleData", "articleTypeData"],
  data() {
    return {
      editDialogVisible: false
    };
  },
  methods: {
    //  提交修改文章
    commitEditArticle() {
      this.$refs.editor2.getContent();
      // 请求修改数据
      postEditArticleData(this.editArticleData)
        .then(res => {
          if (res.code == 0) {
            Notification({
              title: "修改文章",
              message: res.msg,
              type: "success"
            });
            setTimeout(() => {
              this.editDialogVisible = false;
            }, 1000);
          } else {
            Notification({
              title: "修改失败",
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          Notification({
            title: "请求失败",
            message: "发生未知错误" + err,
            type: "error"
          });
        });
    },
    //  文章修改富文本内容赋值
    editGetEditorContent(text) {
      this.editArticleData.content = this.$xss(text);
    },
    //  文章修改类别被选中值发生变化
    editArticleTypeChange(val) {
      this.editArticleData.type = val;
    },
    editArticleCreateTimeChange(val) {
      this.editArticleData.createtime = val;
    },
    editArticleTopChange(val) {
      this.editArticleData.top = val;
    },
    //  文章修改文章状态选择变化
    editArticleStateChange(val) {
      this.editArticleData.articlestate = val;
    },
    //  文章修改焦点变化
    editArticleBannerImgChange(response, file, filelist) {
      let fileListArray = [];
      filelist.forEach(item => {
        fileListArray.push(item.response.filename);
      });
      this.editArticleData.bannerimg = fileListArray.join("|");
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
          width: 18%;
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
