<template>
  <div class="editor-component">
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  props: {
    initContent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editorContent: this.initContent
    };
  },
  methods: {
    getContent: function() {
      this.$emit("getEditorContent", this.editorContent);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    this.editor.create();
    this.editor.txt.html(this.initContent);
  },
  watch: {
    initContent(nVal) {
      this.editor.txt.html(nVal);
    }
  }
};
</script>

<style scoped>
</style>
