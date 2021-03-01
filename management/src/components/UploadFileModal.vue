<template>
  <el-dialog title="文件上传" :visible.sync="uploadFileVisible" width="550px">
    <div class="upload">
      <span class="label">选择文件:</span>
      <el-upload
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :headers="headers"
        :data="getDatas"
        multiple
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div v-if="action === '/api/system/management/student/teacher/task/upload'">
      <span class="label">文件表类型:</span>
      <el-select v-model="type" placeholder="请选择">
        <el-option key="2" label="学生填写表" :value="2"> </el-option>
        <el-option key="3" label="实习任务表" :value="3"> </el-option>
      </el-select>
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
      datas: {},
      action: "",
      type: 2,
    };
  },
  computed: {
    getDatas: function () {
      if (
        this.action === "/api/system/management/student/teacher/task/upload"
      ) {
        return Object.assign(this.datas, { type: this.type });
      } else {
        return this.datas;
      }
    },
  },
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
    handleRemove(file, fileList) {},
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