<template>
  <div class="class">
    <div class="search">
        <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入学生姓名 / 班级名称 / 学院名称 / 专业名称搜索"
        @keyup.enter.native="searchData"
      />
    </div>
    <div class="table">
      <Table
        :data="dataList"
        :columns="columns"
        :total="total"
        v-if="loaded"
        :pageNo="pageNo"
        :pageSize="pageSize"
      >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="giveScoreComents(scope.row)"
              >评定成绩</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import moment from "moment";
import { getStudentList } from "./service";
import { delModal, getUserInfo } from "@/utils/commonFun.js";
export default {
  components: {
    Table,
  },
  data() {
    return {
      loaded: false,
      pageNo: 1,
      pageSize: 10,
      dataList: [],
      total: 0,
      search: "",
      columns: [
        {
          prop: "studentName",
          label: "学生姓名",
        },
        {
          prop: "className",
          label: "班级",
        },
        {
          prop: "professionName",
          label: "专业",
        },
        {
          prop: "collegeName",
          label: "学院",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getDataList();
    },
    giveScoreComents(data) {
      this.$router.push({
        path: "/homePage/scoreCheckList",
        query: { studentId: data.studentId },
      });
    },
    async getDataList() {
      try {
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
          teacherId: this.$store.state.userInfo.userId,
        };
        const resp = await getStudentList(params);
        if (resp.status === 200) {
          this.dataList = resp.data.list;
          this.total = resp.data.total;
        }
      } catch (e) {
      } finally {
        this.loaded = true;
      }
    },
    // 改变页码
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getDataList();
    },
    // 改变页码
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getDataList();
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
    this.getDataList();
  },
};
</script>
<style lang='css' scoped>
.search {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 20px;
}
</style>