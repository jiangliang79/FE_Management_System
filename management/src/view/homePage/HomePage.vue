<template>
  <div class="homePage">
    <div class="header">
      <div class="header-title">
        <h2>实习管理系统</h2>
      </div>
      <div class="userInfo">
        <el-avatar> user </el-avatar>
        <span class="username">用户名</span>
        <el-button size="small">退出</el-button>
      </div>
    </div>
    <div class="content">
      <div class="leftBar">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" class="menu-item">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link to="/homePage/userManagement" tag="span">用户管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2" class="menu-item">
            <i class="el-icon-menu"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>
          <el-submenu index="3" class="menu-item">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>学校组织管理</span>
            </template>
            <el-menu-item index="3-1">学院管理</el-menu-item>
            <el-menu-item index="3-2">专业管理</el-menu-item>
            <el-menu-item index="3-3">班级管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4" class="menu-item">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>老师信息管理</span>
            </template>
            <el-menu-item index="4-1">老师管理</el-menu-item>
            <el-menu-item index="4-2">老师班级管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="rightContent">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {},
  created () { },
  mounted () { },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style scoped>
.homePage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.homePage .header {
  height: 70px;
  background: #1890ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  padding: 0px 20px;
}
.userInfo {
  display: flex;
  align-items: center;
  padding: 0px 20px;
}
.userInfo .username {
  margin: 0 20px 0px 10px;
}
.content {
  display: flex;
  flex: 1;
}
.content .leftBar {
  width: 200px;
  height: 100%;
}
.leftBar .el-menu-vertical-demo {
  height: 100%;
}
.leftBar .menu-item {
  text-align: left;
}
.rightContent {
  flex: 1;
}
</style>