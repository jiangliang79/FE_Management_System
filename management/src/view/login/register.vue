<template>
  <el-dialog title="注册信息" :visible.sync="registerVisible" width="550px">
    <el-form :model="form" :rules="rules">
      <el-form-item label="用户类型:" :label-width="formLabelWidth" :style="{'text-align': 'left'}" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号:" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="性别:" :label-width="formLabelWidth" :style="{'text-align': 'left'}" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系方式:" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { register } from './service';
export default {
  components: {},
  data () {
    return {
      registerVisible: false,
      form: {
        username: '',
        name: '',
        phone: '',
        password: '',
        sex: 0,
        type: 1,
      },
      formLabelWidth: '85px',
      rules: {
        type: [
          { required: true }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        sex: [
          { required: true }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    showModal () {
      this.registerVisible = true;
    },
    cancel () {
      this.registerVisible = false;
      this.resetForm();
    },
    async handleOk () {
      try {
        const params = {
          username: this.form.username,
          name: this.form.name,
          sex: this.form.sex,
          phone: this.form.phone,
          type: this.form.type,
          password: this.form.password,
        }
        const resp = await register(params);
        if (resp.status === 200) {
          this.registerVisible = false;
          this.resetForm();
          this.$message({
            message: '注册成功！请登录',
            type: 'success'
          });
        }
        console.log(resp);

      } catch (e) {
        //
      }

    },
    resetForm () {
      this.username = '';
      this.name = '';
      this.phone = '';
      this.password = '';
      this.sex = 0;
      this.type = 1;
    }
  },
  created () { },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style lang='css' scoped>
</style>