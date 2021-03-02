<template>
  <div class="personalInfo">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名:" prop="studentName">
        <div class="item" v-if="type === 'view'">{{ form.studentName }}</div>
        <el-input v-model="form.studentName" v-else></el-input>
      </el-form-item>
      <el-form-item label="学号:" prop="studentNumber">
        <div class="item" v-if="type === 'view'">{{ form.studentNumber }}</div>
        <el-input v-model="form.studentNumber" v-else></el-input>
      </el-form-item>
      <el-form-item label="性别:" :style="{ 'text-align': 'left' }" prop="sex">
        <div class="item" v-if="type === 'view'">
          {{ form.sex === 0 ? "男" : "女" }}
        </div>
        <el-radio-group v-model="form.sex" v-else>
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在院系:" prop="collegeId">
        <div class="item" v-if="type === 'view'">{{ form.collegeName }}</div>
        <el-select
          v-else
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
      <el-form-item label="所在专业:" prop="professionId">
        <div class="item" v-if="type === 'view'">{{ form.professionName }}</div>
        <el-select
          v-else
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
      <el-form-item label="所在班级:" prop="className" v-if="type === 'view'">
        <div class="item">{{ form.className }}</div>
      </el-form-item>
      <el-form-item label="所在班级:" prop="classId" v-else>
        <el-select
          v-model="form.classId"
          placeholder="请选择所在班级"
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
      <el-form-item label="籍贯:" prop="nativePlace">
        <div class="item" v-if="type === 'view'">{{ form.nativePlace }}</div>
        <el-input v-model="form.nativePlace" v-else></el-input>
      </el-form-item>
      <el-form-item label="现居住地:" prop="nowPlace">
        <div class="item" v-if="type === 'view'">{{ form.nowPlace }}</div>
        <el-input v-model="form.nowPlace" v-else></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="editInfo('form')"
        v-if="type === 'view'"
        :style="{ width: '150px' }"
        >编辑</el-button
      >
      <el-button
        type="primary"
        @click="saveInfo('form')"
        v-else
        :style="{ width: '150px' }"
        >保存</el-button
      >
    </el-form>
  </div>
</template>

<script>
import {
  getStudentInfo,
  getCollegeList,
  getProfessionList,
  getClassList,
  editStudentInfo,
} from "./service";
import { getUserInfo } from "@/utils/commonFun.js";
export default {
  components: {},
  data() {
    return {
      collegeList: [],
      professionList: [],
      classList: [],
      form: {
        studentId: "",
        collegeName: "",
        professionName: "",
        className: "",
        studentName: "",
        studentNumber: 0,
        nativePlace: "",
        classId: "",
        collegeId: "",
        professionId: "",
        nowPlace: "",
        sex: 0,
      },
      type: "view", // edit 编辑状态，view查看状态
      rules: {
        studentName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        studentNumber: [
          { required: true, message: "请输入学号", trigger: "blur" },
        ],
        sex: [{ required: true }],
        collegeId: [{ required: true }],
        professionId: [{ required: true }],
        classId: [{ required: true }],
        nativePlace: [
          { required: true, message: "请输入籍贯", trigger: "blur" },
        ],
        nowPlace: [
          { required: true, message: "请输入现居住地", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    editInfo(formName) {
      this.type = "edit"; // 进入编辑状态
      this.getCollegeLists();
    },
    // 保存编辑的个人信息
    saveInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            studentId: this.form.studentId,
            studentName: this.form.studentName,
            classId: this.form.classId,
            studentNumber: this.form.studentNumber,
            nativePlace: this.form.nativePlace,
            nowPlace: this.form.nowPlace,
            sex: this.form.sex,
          };
          const resp = await editStudentInfo(params);
          if (resp.status === 200) {
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            this.getPersonalInfo();
            this.type = "view";
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取学生个人信息
    async getPersonalInfo() {
      const resp = await getStudentInfo({
        studentId: this.$store.state.userInfo.userId,
      });
      if (resp.status === 200) {
        this.form = resp.data;
      }
    },
    //请求下拉框里的学院列表
    async getCollegeLists() {
      const params = {
        isAll: true,
      };
      const resp = await getCollegeList(params);
      console.log(111, resp);
      if (resp.status === 200) {
        this.collegeList = resp.data.list;
        this.form.collegeId = this.collegeList[0].collegeId;
        this.getprofessionLists();
      }
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
    getUserInfos() {
      const userInfo = getUserInfo();
      this.$store.dispatch("getUserInfo", userInfo);
    },
  },
  created() {
    this.getUserInfos();
  },
  mounted() {
    this.getPersonalInfo();
  },
};
</script>
<style lang='css' scoped>
.personalInfo .item {
  text-align: left;
  margin-left: 20px;
}
</style>