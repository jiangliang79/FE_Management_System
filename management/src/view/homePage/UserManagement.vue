<template>
  <div class="user-manage">
    <div class="serach">
      <el-input
        v-model="search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入用户账号或昵称搜索"
        @keyup.enter.native="searchData"
      />
      <el-button type="primary" @click="addUser">添加</el-button>
    </div>
    <div class="table">
      <Table
        :data="userList"
        :columns="columns"
        :total="total"
        v-if="loaded"
        :pageNo="pageNo"
        :pageSize="pageSize"
      >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="resetPassword(scope.row.userId)"
              >重置密码</el-button
            >
            <el-button size="mini" type="primary" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="openDeleteModal(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <UserModal ref="user_modal" />
    <ResetPasswordModal ref="reset_modal" :userId="selectUserId" />
  </div>
</template>

<script>
import { userList, deleteUser } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
import UserModal from "@/components/UserModal.vue";
import ResetPasswordModal from "@/components/ResetPasswordModal.vue";
import { delModal } from "@/utils/deleteFun.js";
export default {
  components: {
    Table,
    UserModal,
    ResetPasswordModal,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      pageNo: 1,
      pageSize: 10,
      search: "",
      userList: [],
      total: 0,
      selectUserId: 0,
      columns: [
        {
          prop: "userType",
          label: "用户类型",
          formatter: (row, column, cellValue, index) => {
            return this.getUserType(cellValue);
          },
        },
        {
          prop: "username",
          label: "账号",
        },
        {
          prop: "name",
          label: "昵称",
        },
        {
          prop: "description",
          label: "备注",
        },
        {
          prop: "createTime",
          label: "录入时间",
          formatter: (row, column, cellValue, index) => {
            return moment(cellValue).format("YYYY-MM-DD hh:mm:ss");
          },
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    async resetPassword(userId) {
      this.selectUserId = userId;
      this.$refs.reset_modal.showModal();
    },
    addUser() {
      this.$refs.user_modal.operatorType = 0;
      this.$refs.user_modal.resetForm();
      this.$refs.user_modal.showModal();
    },
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getUserList();
    },
    edit(data) {
      this.$refs.user_modal.operatorType = 1;
      this.$refs.user_modal.form = data;
      this.$refs.user_modal.showModal();
    },
    openDeleteModal(data) {
      delModal(this.deleteUser, data, data.username);
    },
    async deleteUser(data) {
      const params = {
        type: data.userType,
        userId: data.userId,
      };
      const resp = await deleteUser(params);
      if (resp.status === 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getUserList();
      }
    },
    async getUserList() {
      this.loading = true;
      try {
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        const resp = await userList(params);
        if (resp.status === 200) {
          this.userList = resp.data.list;
          this.total = resp.data.total;
        }
      } catch (e) {
      } finally {
        this.loading = false;
        this.loaded = true;
      }
    },
    // id 和name 映射
    getUserType(type) {
      switch (type) {
        case 0:
          return "管理员";
        case 1:
          return "学生";
        case 2:
          return "老师";
        case 3:
          return "学院";
        default:
          return "";
      }
    },
    // 改变页码
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUserList();
    },
    // 改变页码
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getUserList();
    },
  },
  created() {},
  mounted() {
    this.getUserList();
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
.user-manage .serach {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 20px;
}
</style>