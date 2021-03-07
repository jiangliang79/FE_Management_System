<template>
  <el-dialog
    :title="operatorType === 0 ? '添加班级信息' : '编辑班级信息'"
    :visible.sync="classVisible"
    width="550px"
  >
    <el-form :model="form" :rules="rules">
      <el-form-item
        label="所属学院:"
        prop="collegeId"
        :label-width="formLabelWidth"
        :style="{ 'text-align': 'left' }"
      >
        <el-select
          v-model="form.collegeId"
          placeholder="请选择所属学院"
          :style="{ width: '100%' }"
          @change="getprofessionLists"
        >
          <el-option
            :label="item.collegeName"
            :value="item.collegeId"
            v-for="item in collegeList"
            :key="item.collegeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属专业:"
        prop="professionId"
        :label-width="formLabelWidth"
        :style="{ 'text-align': 'left' }"
      >
        <el-select
          v-model="form.professionId"
          placeholder="请选择所属专业"
          :style="{ width: '100%' }"
        >
          <el-option
            :label="item.professionName"
            :value="item.professionId"
            v-for="item in professionList"
            :key="item.professionId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="班级名称:"
        :label-width="formLabelWidth"
        prop="className"
      >
        <el-input
          v-model="form.className"
          placeholder="请输入班级名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="resetForm" type="default">重置</el-button>
      <el-button type="primary" @click="handleOk">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getCollegeList,
  getProfessionList,
  addClass,
} from "@/view/homePage/service.js";
export default {
  components: {},
  data() {
    return {
      classVisible: false,
      operatorType: 0,
      collegeList: [],
      professionList: [],
      classId: 0,
      form: {
        className: "",
        collegeId: "",
        professionId: "",
      },
      formLabelWidth: "85px",
      rules: {
        collegeId: [{ required: true }],
        professionId: [{ required: true }],
        className: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹窗
    showModal() {
      this.classVisible = true;
      console.log(this.form.collegeId);
      this.getCollegeLists();
    },
    cancel() {
      this.classVisible = false;
      this.operatorType === 0 && this.resetForm(); // 添加的时候才会清空填写的内容
    },
    resetForm() {
      this.form.collegeId = this.collegeList[0].collegeId;
      this.form.professionId = this.professionList[0].professionId;
      this.form.className = "";
    },
    // 提交信息
    async handleOk() {
      if (this.form.className === "") {
        this.$message({
          message: "请输入班级名称",
          type: "error",
        });
        return;
      }
      try {
        let params = {
          operatorType: this.operatorType,
          collegeId: this.form.collegeId,
          className: this.form.className,
          professionId: this.form.professionId,
        };
        params = Object.assign(
          params,
          this.operatorType === 1 ? { classId: this.form.classId } : {}
        );
        const resp = await addClass(params);
        if (resp.status === 200) {
          this.$message({
            message: this.operatorType === 0 ? "添加成功" : "编辑成功",
            type: "success",
          });
          this.classVisible = false;
          this.operatorType === 0 && this.resetForm();
          this.$parent.getDataList();
        }
      } catch (e) {}
    },
    //请求下拉框里的学院列表
    async getCollegeLists() {
      try {
        const params = {
          isAll: true,
        };
        const resp = await getCollegeList(params);
        if (resp.status === 200) {
          this.collegeList = resp.data.list;
          // this.form.collegeId = this.collegeList[0].collegeId;
          this.getprofessionLists();
        }
      } catch (e) {}
    },
    // 请求对应学院的专业列表
    async getprofessionLists() {
      const params = {
        collegeId: this.form.collegeId,
      };
      const resp = await getProfessionList(params);
      if (resp.status === 200) {
        this.professionList = resp.data.list;
      }
    },
  },
  created() {},
  mounted() {
    //
  },
};
</script>
<style lang='css' scoped>
</style>