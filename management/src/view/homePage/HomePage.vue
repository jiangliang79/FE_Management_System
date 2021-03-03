<template>
  <div class="homePage">
    <div class="header">
      <div class="header-title">
        <h2>实习管理系统</h2>
      </div>
      <div class="userInfo">
        <el-avatar>{{ username }}</el-avatar>
        <span class="username">{{ username }}</span>
        <el-button size="small" @click="loginOut">退出</el-button>
      </div>
    </div>
    <div class="content">
      <div class="leftBar">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            index="1"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <i class="el-icon-s-custom"></i>
            <span slot="title">
              <router-link to="/homePage/userManagement" tag="span"
                >用户管理</router-link
              >
            </span>
          </el-menu-item>
          <el-menu-item
            index="2"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type !== 1"
          >
            <i class="el-icon-user-solid"></i>
            <span slot="title"
              ><router-link to="/homePage/studentInfo" tag="span"
                >学生信息</router-link
              ></span
            >
          </el-menu-item>
          <el-submenu
            index="3"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>学校组织管理</span>
            </template>
            <el-menu-item index="3-1">
              <router-link to="/homePage/department" tag="span"
                >学院管理</router-link
              >
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/homePage/profession" tag="span"
                >专业管理</router-link
              ></el-menu-item
            >
            <el-menu-item index="3-3">
              <router-link to="/homePage/class" tag="span"
                >班级管理</router-link
              >
            </el-menu-item>
          </el-submenu>
          <el-submenu
            index="4"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>老师信息管理</span>
            </template>
            <el-menu-item index="4-1"
              ><router-link to="/homePage/teacherList" tag="span"
                >老师管理</router-link
              ></el-menu-item
            >
            <el-menu-item index="4-2"
              ><router-link to="/homePage/teacherClass" tag="span"
                >老师班级管理</router-link
              ></el-menu-item
            >
          </el-submenu>
          <el-menu-item
            index="5"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <i class="el-icon-s-management"></i>
            <span slot="title"
              ><router-link to="/homePage/fileTableManagement" tag="span"
                >文档表管理</router-link
              ></span
            >
          </el-menu-item>
          <el-menu-item
            index="8"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 2"
          >
            <i class="el-icon-edit-outline"></i>
            <span slot="title"
              ><router-link to="/homePage/checkTaskTable" tag="span"
                >批阅实习表</router-link
              ></span
            >
          </el-menu-item>
          <el-submenu
            index="6"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 2"
          >
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>发布任务管理</span>
            </template>
            <el-menu-item index="6-1"
              ><router-link to="/homePage/sendTask" tag="span"
                >发布任务</router-link
              ></el-menu-item
            >
            <el-menu-item index="6-2"
              ><router-link to="/homePage/teacherSendTaskRecord" tag="span"
                >老师发布任务记录</router-link
              ></el-menu-item
            >
          </el-submenu>
          <el-menu-item
            index="6"
            class="menu-item"
            v-else-if="
              +this.$store.state.userInfo.type === 0 ||
              +this.$store.state.userInfo.type === 3
            "
          >
            <i class="el-icon-s-order"></i>
            <span slot="title"
              ><router-link to="/homePage/teacherSendTaskRecord" tag="span"
                >老师发布任务记录</router-link
              ></span
            >
          </el-menu-item>
          <el-submenu
            index="7"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 2"
          >
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>成绩评定管理</span>
            </template>
            <el-menu-item index="7-1"
              ><router-link to="/homePage/scoreCheck" tag="span"
                >成绩评定</router-link
              ></el-menu-item
            >
            <el-menu-item index="7-2"
              ><router-link to="/homePage/studentScoreRecord" tag="span"
                >学生成绩评定记录</router-link
              ></el-menu-item
            >
          </el-submenu>
          <el-menu-item
            index="7"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <i class="el-icon-notebook-2"></i>
            <span slot="title"
              ><router-link to="/homePage/studentScoreRecord" tag="span"
                >学生成绩评定记录</router-link
              ></span
            >
          </el-menu-item>
          <el-menu-item
            index="9"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type !== 1"
          >
            <i class="el-icon-data-board"></i>
            <span slot="title"
              ><router-link to="/homePage/fileViewDownload" tag="span"
                >批阅查看及下载</router-link
              ></span
            >
          </el-menu-item>
          <el-menu-item
            index="10"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 1"
          >
            <i class="el-icon-user-solid"></i>
            <span slot="title"
              ><router-link to="/homePage/personalInfo" tag="span"
                >个人信息</router-link
              ></span
            >
          </el-menu-item>
          <el-submenu
            index="11"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 1"
          >
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>实习管理</span>
            </template>
            <el-menu-item index="11-1"
              ><router-link to="/homePage/studentTask" tag="span"
                >实习表填写</router-link
              ></el-menu-item
            >
            <el-menu-item index="11-2"
              ><router-link to="/homePage/teacherTaskRecord" tag="span"
                >查看老师发布任务</router-link
              ></el-menu-item
            >
            <el-menu-item index="11-3"
              ><router-link to="/homePage/studentTaskWriteRecord" tag="span"
                >学生实习表填写记录</router-link
              ></el-menu-item
            >
          </el-submenu>
          <el-menu-item
            index="12"
            class="menu-item"
            v-if="+this.$store.state.userInfo.type === 0"
          >
            <i class="el-icon-s-platform"></i>
            <span slot="title"
              ><router-link to="/homePage/echarts" tag="span"
                >数据管理</router-link
              ></span
            >
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { loginOut } from "./service";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      username: (state) => state.userInfo.username,
    }),
  },
  watch: {},
  methods: {
    async loginOut() {
      try {
        const resp = await loginOut({ username: this.username });
        if (resp.status === 200) {
          this.$router.push({ path: "/" });
          window.localStorage.clear();
        }
      } catch (e) {
        //
      }
    },
    getUserInfo() {
      const users = window.localStorage.getItem("userinfo").split("&");
      let userInfo = {};
      users.forEach((item) => {
        const rs = item.split("=");
        const obj = {};
        obj[rs[0]] = rs[1];
        userInfo = Object.assign(userInfo, obj);
      });
      this.$store.dispatch("getUserInfo", userInfo);
    },
  },
  created() {},
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style scoped>
.homePage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-flow: column;
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
  flex-flow: row;
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
  padding: 20px;
}
</style>