
<template>
  <div class="loginPage">
    <div class="loginbox">
      <h2>实习管理系统</h2>
      <div class="login-box">
        <!-- <div class="login-title">登录</div> -->
        <div>
          <div class="item">
            <span>账号：</span>
            <el-input
              v-model="username"
              placeholder="请输入账号"
              :style="{ width: '85%' }"
            ></el-input>
          </div>
          <div class="item">
            <span>密码：</span>
            <el-input
              placeholder="请输入密码"
              v-model="password"
              show-password
              :style="{ width: '85%' }"
            ></el-input>
          </div>
          <div class="tips">
            没有账号?
            <el-button type="text" @click="goToRegister"> 去注册 </el-button>
          </div>
        </div>
        <div class="login-btn">
          <el-button type="primary" :style="{ width: '70%' }" @click="login"
            >登录</el-button
          >
        </div>
      </div>
    </div>
    <RegisterModal ref="register_modal" />
  </div>
</template>

<script>
import RegisterModal from "./register";
import { login } from "./service";
export default {
  components: {
    RegisterModal,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    goToRegister() {
      this.$refs.register_modal.showModal();
    },
    getUserInfo(userInfo) {
      this.$store.dispatch("getUserInfo", userInfo);
    },
    async login() {
      const params = {
        username: this.username,
        password: this.password,
      };
      const resp = await login(params);
      console.log(resp);
      if (resp.status === 200) {
        if (resp.data.loginStatus === 0) {
          this.username = resp.data.username;
          window.localStorage.setItem(
            "authentication",
            resp.data.authentication
          );
          window.localStorage.setItem(
            "userinfo",
            `userId=${resp.data.userId}&username=${resp.data.username}&type=${resp.data.type}`
          );
          this.getUserInfo(resp.data);
          this.$router.push({
            path: "/homePage/welcome",
          });
        } else {
          this.$message({
            message: "用户名或密码不能为空",
            type: "error",
          });
        }
      }
    },
  },
  created() {},
  mounted() {
    window.localStorage.getItem("authentication") &&
      this.$router.push({
        path: "/homePage/welcome",
      });
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
.loginPage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../static/assets/bg.jpeg");
  background-size: 100% 100%;
}
.loginPage .loginbox {
  width: 520px;
  height: auto;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  box-shadow: 1px 2px 3px #d9d9d9;
  position: absolute;
  top: 20%;
  left: 35%;
  z-index: 999;
  padding: 10px;
}
.loginPage h2 {
  margin-top: 20px;
  color: rgb(52, 98, 223);
}
.loginPage .login-box {
  width: 65%;
  margin: 20px auto 50px auto;
}
.login-box .item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.loginPage .login-title {
  font-size: 16px;
  text-align: left;
  font-weight: 700;
}
.login-box .tips {
  font-size: 12px;
  text-align: right;
}
.loginPage .login-btn {
  margin-top: 30px;
  text-align: center;
}
</style>