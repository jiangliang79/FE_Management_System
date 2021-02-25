<template>
  <el-dialog
    :title="operatorType === 0 ? '添加用户信息' : '编辑用户信息'"
    :visible.sync="addUserVisible"
    width="550px"
  >
    <el-form :model="form" :rules="rules">
      <el-form-item
        label="用户类型:"
        prop="userType"
        :label-width="formLabelWidth"
        :style="{ 'text-align': 'left' }"
      >
        <el-select
          v-model="form.userType"
          placeholder="请选择用户类型"
          :style="{ width: '100%' }"
        >
          <el-option label="管理员" :value="0"></el-option>
          <el-option label="学生" :value="1"></el-option>
          <el-option label="老师" :value="2"></el-option>
          <el-option label="二级学院" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号:" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item
        label="密码:"
        :label-width="formLabelWidth"
        prop="password"
        v-if="operatorType === 0"
      >
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
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
import { addUser } from "@/view/homePage/service.js";
export default {
  components: {},
  data() {
    return {
      addUserVisible: false,
      operatorType: 0,
      form: {
        username: "",
        name: "",
        description: "",
        password: "",
        userType: 0,
      },
      formLabelWidth: "85px",
      rules: {
        userType: [{ required: true }],
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { pattern: /^[^\u4E00-\u9FFF]+$/, message: "账号不能输入汉字" },
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        description: [
          { required: false, message: "请输入备注", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    showModal() {
      this.addUserVisible = true;
    },
    cancel() {
      this.addUserVisible = false;
      this.resetForm();
    },
    validate() {
      if (this.form.username === "") {
        return {
          error: "请输入账号",
          code: 0,
        };
      }
      if (this.form.name === "") {
        return {
          error: "请输入昵称",
          code: 0,
        };
      }
      if (this.operatorType === 0 && this.form.password === "") {
        return {
          error: "请输入密码",
          code: 0,
        };
      } else {
        return {
          error: "",
          code: 1,
        };
      }
    },
    async handleOk() {
      const val = this.validate();
      if (val.code === 0) {
        this.$message({
          message: val.error,
          type: "error",
        });
        return;
      }
      let params = {
        username: this.form.username,
        userType: this.form.userType,
        name: this.form.name,
        description: this.form.description,
        operatorType: this.operatorType,
      };
      params = Object.assign(
        params,
        this.operatorType === 0 ? { password: this.password } : {}
      );
      const resp = await addUser(params);
      if (resp.status === 200) {
        this.$message({
          message: this.operatorType === 0 ? "添加成功" : "编辑成功",
          type: "success",
        });
        this.addUserVisible = false;
        this.resetForm();
        this.$parent.getUserList();
      }
    },
    // 重置表单
    resetForm() {
      this.form = {
        username: "",
        userType: 0,
        name: "",
        password: "",
        description: "",
      };
    },
  },
  mounted() {},
};
</script>
<style lang='css' scoped>
</style>