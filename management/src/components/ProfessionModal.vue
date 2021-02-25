<template>
  <el-dialog
    :title="operatorType === 0 ? '添加专业信息' : '编辑专业信息'"
    :visible.sync="proVisible"
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
        label="专业名称:"
        :label-width="formLabelWidth"
        prop="professionName"
      >
        <el-input
          v-model="form.professionName"
          placeholder="请输入专业名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注:"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.description"
          placeholder="请输入备注"
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
import { getCollegeList, addProfession } from "@/view/homePage/service.js";
export default {
  components: {},
  data() {
    return {
      proVisible: false,
      operatorType: 0,
      collegeList: [],
      professionId: 0,
      form: {
        professionName: "",
        name: "",
        description: "",
        password: "",
        collegeId: 0,
      },
      formLabelWidth: "85px",
      rules: {
        collegeId: [{ required: true }],
        professionName: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
        ],
        description: [
          { required: false, message: "请输入备注", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹窗
    showModal() {
      this.proVisible = true;
    },
    cancel() {
      this.proVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.form.collegeId = this.collegeList[0].collegeId;
      this.form.professionName = "";
      this.form.description = "";
    },
    // 提交信息
    async handleOk() {
      if (this.professionName === "") {
        this.$message({
          message: "请输入专业名称",
          type: "error",
        });
        return;
      }
      try {
        let params = {
          operatorType: this.operatorType,
          collegeId: this.form.collegeId,
          professionName: this.form.professionName,
        };
        params = Object.assign(
          params,
          this.operatorType === 1
            ? { professionId: this.form.professionId }
            : {}
        );
        const resp = await addProfession(params);
        if (resp.status === 200) {
          this.$message({
            message: this.operatorType === 0 ? "添加成功" : "编辑成功",
            type: "success",
          });
          this.proVisible = false;
          this.resetForm();
          this.$parent.getDataList();
        }
      } catch (e) {}
    },
    //请求下拉框里的学院列表
    async getdataList() {
      try {
        const params = {
          isAll: true,
        };
        const resp = await getCollegeList(params);
        if (resp.status === 200) {
          this.collegeList = resp.data.list;
          this.form.collegeId = this.collegeList[0].collegeId;
        }
      } catch (e) {
      } finally {
        this.loaded = true;
      }
    },
  },
  created() {},
  mounted() {
    this.getdataList();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang='css' scoped>
</style>