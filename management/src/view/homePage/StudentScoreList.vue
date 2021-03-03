<template>
  <div class="department">
    <div class="search">
      <el-input
        v-model="search"
        size="medium"
        prefix-icon="el-icon-search"
        :style="{ width: '500px' }"
        placeholder="请输入文件名称 / 老师名称 / 学生姓名"
        @keyup.enter.native="searchData"
      />
    </div>
    <div class="table">
      <Table
        :data="collegeList"
        :columns="columns"
        :total="total"
        v-if="loaded"
        :pageNo="pageNo"
        :pageSize="pageSize"
      >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="preview(scope.row)">预览</el-button>
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
  </div>
</template>

<script>
import { getStudentGradeList, deleteRecord } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
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
      search: "",
      total: 0,
      collegeList: [],
      isAll: false,
      columns: [
        {
          prop: "studentName",
          label: "学生姓名",
        },
        {
          prop: "articleName",
          label: "表名",
        },
        {
          prop: "teacherName",
          label: "评定老师",
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
          label: "学院名称",
        },
        {
          prop: "releaseTime",
          label: "发布时间",
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
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getdataList();
    },
    preview(data) {
      this.pdfUrl =
        window.origin +
        "/api/system/management/article/preview?articleId=" +
        data.articleId;
      var win = window.open(this.pdfUrl);
      win.document.title = data.articleName;
    },
    openDeleteModal(data) {
      delModal(this.deleteCollege, data, data.collegeName);
    },
    async deleteCollege(data) {
      const resp = await deleteRecord({ type: 2, recordId: data.recordId });
      if (resp.status === 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getdataList();
      }
    },
    async getdataList() {
      try {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        if (+this.$store.state.userInfo.type === 3) {
          // 学院部分
          params = Object.assign(params, {
            collegeId: this.$store.state.userInfo.userId,
          });
        } else if (+this.$store.state.userInfo.type === 2) {
          // 老师部分
          params = Object.assign(params, {
            teacherId: this.$store.state.userInfo.userId,
          });
        }
        const resp = await getStudentGradeList(params);
        if (resp.status === 200) {
          this.collegeList = resp.data.list;
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
      this.getdataList();
    },
    // 改变页码
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getdataList();
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
    this.getdataList();
  },
};
</script>
<style lang='css' scoped>
.department .search {
  text-align: left;
  margin-bottom: 20px;
}
</style>