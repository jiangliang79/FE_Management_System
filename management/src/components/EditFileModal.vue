<template>
  <el-dialog title="编辑文件" :visible.sync="editFileVisible" width="550px">
    <el-form :model="form" :rules="rules">
      <el-form-item
        label="文件名称:"
        :label-width="formLabelWidth"
        prop="articleName"
      >
        <el-input
          v-model="form.articleName"
          placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="文件表类型:"
        prop="articleType"
        :label-width="formLabelWidth"
        :style="{ 'text-align': 'left' }"
      >
        <el-select
          v-model="form.articleType"
          placeholder="请选择文件表类型"
          :style="{ width: '100%' }"
        >
          <el-option label="老师评分表" :value="1" key="1"
            >老师评分表</el-option
          >
          <el-option label="学生填写表" :value="2" key="1"
            >学生填写表</el-option
          >
          <el-option label="实习任务表" :value="3" key="1"
            >实习任务表</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item
        prop="startTime"
        label="开始时间:"
        :style="{ display: 'flex' }"
      >
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.startTime"
          value-format="timestamp"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        prop="endTime"
        label="结束时间:"
        :style="{ display: 'flex' }"
      >
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.endTime"
          value-format="timestamp"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editFile } from "@/view/homePage/service.js";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      editFileVisible: false,
      form: {
        articleName: "",
        articleType: 1,
        startTime: 0,
        endTime: 0,
        articleId: "",
      },
      formLabelWidth: "100px",
      rules: {
        articleName: [
          { required: true, message: "请输入文件名称", trigger: "blur" },
        ],
        articleType: [{ required: true }],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹窗
    showModal() {
      this.editFileVisible = true;
    },
    cancel() {
      this.editFileVisible = false;
    },
    // 提交信息
    async handleOk() {
      try {
        let params = {
          articleId: this.form.articleId,
          articleType: this.form.articleType,
          startTime: this.form.startTime,
          endTime: this.form.endTime,
        };
        const resp = await editFile(params);
        if (resp.status === 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.editFileVisible = false;
          this.$parent.getDataList();
        }
      } catch (e) {}
    },
  },
};
</script>
<style lang='css' scoped>
</style>