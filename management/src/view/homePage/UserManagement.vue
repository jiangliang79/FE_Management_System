<template>
  <div class="user-manage">
    <div class="serach">
      <el-input
        v-model="search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入搜索内容"
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
            <el-button size="mini" type="primary" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <UserModal ref="user_modal" />
  </div>
</template>

<script>
import { userList, deleteUser } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
import UserModal from "@/components/UserModal.vue";
export default {
  components: {
    Table,
    UserModal,
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
      columns: [
        {
          prop: "userType",
          label: "用户类型",
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
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    addUser() {
      this.$refs.user_modal.showModal();
    },
    searchData() {
      this.getUserList();
    },
    edit(data) {
      console.log(data);
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
          this.userList = resp.data.list.map((item) => {
            return {
              username: item.username,
              userType: item.userType,
              name: item.name,
              userId: item.userId,
              description: item.description,
              createTime: moment(item.createTime).format("YYYY-MM-DD hh:mm:ss"),
            };
          });
          this.total = resp.data.total;

          console.log(resp);
        }
      } catch (e) {
      } finally {
        this.loading = false;
        this.loaded = true;
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUserList();
    },
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