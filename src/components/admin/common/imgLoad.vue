<template>
  <div class="image-load-component">
    <el-upload
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :data="{target:'article'}"
      list-type="picture"
    >
      <slot name="cont">
        <el-button class="uploadbtn" size="small" type="primary">上传图片(500KB内)</el-button>
      </slot>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["action"], //https://jsonplaceholder.typicode.com/posts/
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    //  上传成功回调
    handleSuccess(response, file, fileList) {
      //   console.log("上传成功回调： ", file, fileList);
      this.$emit("uploadImageSuccess", response, file, fileList);
    },
    //   移除某项回调
    handleRemove(file, fileList) {
      console.log("移除某项图调用： ", file, fileList);
      this.$emit("removeUploadImage", file);
    },
    //  点击列表项触发回调
    handlePreview(file) {
      //   console.log(file);
    }
  }
};
</script>

<style lang='stylus' scoped></style>
