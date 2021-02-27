<template>
  <el-dialog title="文件上传" :visible.sync="uploadFileVisible" width="550px">
    <div class="upload">
      <span class="label">选择文件:</span>
      <el-upload
        class="upload-demo"
        action="/api/system/management/article/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :headers="headers"
        multiple
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
let tocken = window.localStorage.getItem("authentication")
  ? window.localStorage.getItem("authentication")
  : null;
export default {
  components: {},
  data() {
    return {
      uploadFileVisible: false,
      fileList: [],
      headers: {
        authentication: tocken,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    showModal() {
      this.uploadFileVisible = true;
    },
    // cancel() {
    //   this.uploadFileVisible = false;
    //   // this.resetForm();
    // },
    handleOk() {
      this.uploadFileVisible = false;
      this.$parent.getDataList();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>
<style lang='css' scoped>
.upload {
  display: flex;
}
.label {
  margin: 0px 30px;
}
</style>