<template>
  <el-dialog title="分配班级" :visible.sync="classDivideVisible" width="550px">
    <el-form :model="form" :rules="rules">
      <el-form-item
        label="老师姓名:"
        :label-width="formLabelWidth"
        prop="teacherName"
      >
        <el-input
          v-model="form.teacherName"
          placeholder="请输入老师姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号:"
        :label-width="formLabelWidth"
        prop="teacherAccountNumber"
      >
        <el-input
          v-model="form.teacherAccountNumber"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
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
          @change="getAllClassList"
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
        label="管理班级:"
        prop="classIds"
        :label-width="formLabelWidth"
        :style="{ 'text-align': 'left' }"
      >
        <el-select
          v-model="form.classIds"
          multiple
          placeholder="请选择管理班级"
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <!-- <el-button @click="resetForm" type="default">重置</el-button> -->
      <el-button type="primary" @click="handleOk">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getCollegeList,
  getProfessionList,
  getClassList,
  classDivid,
} from "@/view/homePage/service.js";
export default {
  components: {},
  data() {
    return {
      classDivideVisible: false,
      operatorType: 0,
      collegeList: [],
      professionList: [],
      classList: [],
      form: {
        teacherName: "",
        teacherAccountNumber: "",
        classIds: [],
        collegeId: "",
        professionId: "",
        teacherId: "",
      },
      formLabelWidth: "85px",
      rules: {
        teacherName: [
          { required: true, message: "请输入老师名称", trigger: "blur" },
        ],
        teacherAccountNumber: [
          { required: true, message: "请输入老师账号", trigger: "blur" },
        ],
        collegeId: [{ required: true }],
        professionId: [{ required: true }],
        classIds: [
          { required: true, message: "请选择班级", trigger: "change" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹窗
    showModal() {
      this.classDivideVisible = true;
    },
    cancel() {
      this.classDivideVisible = false;
      this.form.classIds = [];
    },
    // 提交信息
    async handleOk() {
      if (this.form.classIds.length <= 0) {
        this.$message({
          message: "请选择班级",
          type: "error",
        });
        return;
      }
      try {
        let params = {
          teacherId: this.form.teacherId,
          classId: this.form.classIds,
        };
        const resp = await classDivid(params);
        if (resp.status === 200) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.classDivideVisible = false;
          this.form.classIds = [];
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
          this.form.collegeId = this.collegeList[0].collegeId;
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
        this.form.professionId = this.professionList[0].professionId;
        this.getAllClassList();
      }
    },
    // 获取班级列表
    async getAllClassList() {
      try {
        const params = {
          professionId: this.form.professionId,
        };
        const resp = await getClassList(params);
        if (resp.status === 200) {
          this.classList = resp.data.list;
        }
      } catch (e) {}
    },
  },
  created() {},
  mounted() {
    this.getCollegeLists();
  },
};
</script>
<style lang='css' scoped>
</style>