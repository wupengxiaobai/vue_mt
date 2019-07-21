<template>
  <div class="article-management">
    <admin-default :selectMenuIndex="'2'">
      <div slot="main">
        <!-- 操作 -->
        <div class="opera-wrap">
          <el-button type="primary" @click="addArticleShow">添加文章</el-button>
          <el-button :disabled="!ids.length" type="danger" @click="deleteChecked(ids)">批量删除</el-button>
          <el-input placeholder="请输入搜索关键词" v-model="searchInput" class="input-with-select">
            <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="标题" value="1"></el-option>
              <el-option label="类别" value="2"></el-option>
            </el-select>
            <el-button
              @click="getArticleData({type:select,keyword:searchInput})"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
        <!-- 表格 -->
        <div class="tab-wrap">
          <el-table
            border
            highlight-current-row
            :data="articleListData"
            style="width: 100%"
            max-height="470"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" label="日期">
              <template slot-scope="scope">
                <p>{{ formatTime(new Date(scope.row.createtime))}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="title" label="标题"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="desc" label="描述"></el-table-column>
            <el-table-column align="center" label="焦点图">
              <template slot-scope="scope">
                <img
                  width="100%"
                  :src="scope.row.bannerimg?scope.row.bannerimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558659946263&di=83a1047b593eb9dd0dc19f1666aae116&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F30%2F20170330225122_TLMun.jpeg'"
                  alt="封面"
                >
                <span>[下载]</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="top" label="是否置顶">
              <template slot-scope="scope">
                <span>{{ scope.row.top == 0? '否':'是' }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="articlestate" label="文章状态">
              <template slot-scope="scope">
                <span>{{ scope.row.articlestate == 0? '隐藏':'正常' }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="文章归类"></el-table-column>
            <el-table-column align="center" fixed="right" prop="opera" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(scope.$index, articleListData)"
                  type="primary"
                  size="mini"
                >编辑</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, articleListData)"
                  type="danger"
                  size="mini"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagation-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagationParams.currentPage"
            :page-sizes="[1, 10, 20, 50, 100, 200, 500]"
            :page-size="pagationParams.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagationParams.totalcount"
          ></el-pagination>
        </div>

        <!-- 添加文章模态组件 -->
        <add-article :articleTypeData="articleTypeData" ref="add-article"></add-article>

        <!-- 修改文章模态组件 -->
        <edit-article
          :articleTypeData="articleTypeData"
          :editArticleData="editArticleData"
          ref="edit-article"
        ></edit-article>
      </div>
    </admin-default>
  </div>
</template>

<script>
import { MessageBox, Notification } from "element-ui";
import {
  getArticleTypeData,
  getArticleData,
  deleteArticleData
} from "api/article.js";
import { formatTime } from "common/js/util";
import AdminDefault from "./default.vue";
import EditArticle from "components/admin/article/edit-article.vue";
import AddArticle from "components/admin/article/add-article.vue";
export default {
  data() {
    return {
      articleListData: [],
      pagationParams: {
        currentPage: 1,
        totalcount: 100,
        limit: 50
      },
      select: "",
      searchInput: "",
      articleTypeData: [],
      ids: [], //  复选框选中id数据
      editArticleData: {
        articlestate: 1
      }
    };
  },
  methods: {
    //   添加文章model显示
    addArticleShow() {
      this.$refs["add-article"].dialogVisible = true;
    },
    //   获取选择框所需文章类别数据
    getArticleTypeData() {
      getArticleTypeData().then(res => {
        // 处理数据, 渲染选择框
        let tempArr = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].pid === 0) {
            tempArr.push({
              label: res[i].name,
              id: res[i].id,
              options: []
            });
          }
          for (let j = 0; j < res.length; j++) {
            if (res[j].pid === res[i].id) {
              tempArr[i]["options"].push({
                label: res[j].name,
                id: res[j].id
              });
            }
          }
        }
        this.articleTypeData = tempArr;
      });
    },
    //   获取文章数据
    getArticleData(params) {
      getArticleData(params).then(res => {
        this.articleListData = res.data;
        this.pagationParams.totalcount = res.totalcount;
      });
    },
    //   复选框选中项变化
    handleSelectionChange(selection) {
      let ids = new Array();
      selection.forEach(item => {
        ids.push(item.id);
      });
      this.ids = ids;
    },
    //  每页显示条数变化回调
    handleSizeChange(val) {
      this.pagationParams.limit = val;
      this.getArticleData({
        type: this.select,
        keyword: this.searchInput,
        limit: this.pagationParams.limit,
        currentPage: this.pagationParams.currentPage
      });
    },
    //  页码改变回调
    handleCurrentChange(val) {
      this.pagationParams.currentPage = val;
      this.getArticleData({
        type: this.select,
        keyword: this.searchInput,
        limit: this.pagationParams.limit,
        currentPage: this.pagationParams.currentPage
      });
    },
    //  操作行
    editRow(index, rows) {
      this.editArticleData = Object.assign(
        {},
        this.editArticleData,
        this.articleListData.find(item => item.id == rows[index].id)
      );
      this.$refs["edit-article"].editDialogVisible = true;
    },
    //  移除一项
    deleteRow(index, rows) {
      MessageBox.confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  动态请求隐藏操作
          deleteArticleData({ id: rows[index].id }).then(res => {
            if (res) {
              //  静态删除
              rows.splice(index, 1);
              this.pagationParams.totalcount--;
              Notification({
                title: "删除成功",
                message: "删除文章成功",
                type: "success"
              });
            } else {
              Notification({
                title: "删除失败",
                message: "删除文章失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          Notification({
            title: "取消删除成功",
            message: "已取消删除",
            type: "info"
          });
        });
    },
    //  移除多项
    deleteChecked(ids) {
      MessageBox.confirm("此操作将批量删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  动态请求隐藏操作
          deleteArticleData({ id: ids }).then(res => {
            if (res) {
              //  静态删除 -> 数组中剔除筛选所有id数据
              this.articleListData = this.articleListData.filter(
                (item, index) => ids.findIndex(id => id == item.id) == -1
              );
              this.pagationParams.totalcount--;
              Notification({
                title: "删除成功",
                message: "批量删除文章成功",
                type: "success"
              });
            } else {
              Notification({
                title: "删除失败",
                message: "批量删除文章失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          Notification({
            title: "取消删除成功",
            message: "已取消删除",
            type: "info"
          });
        });
    },
    formatTime(params) {
      return formatTime(params);
    }
  },
  created() {
    this.getArticleData({
      type: this.select,
      keyword: this.searchInput,
      limit: this.pagationParams.limit,
      currentPage: this.pagationParams.currentPage
    });

    //   请求服务器获取文章类别菜单数据
    this.getArticleTypeData();
  },
  components: {
    AdminDefault,
    EditArticle,
    AddArticle
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.article-management {
  .main {
    .opera-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      &>* {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }

      .select {
        width: 100px;
      }
    }

    .tab-wrap {
      margin-bottom: 20px;
    }
  }
}
</style>
