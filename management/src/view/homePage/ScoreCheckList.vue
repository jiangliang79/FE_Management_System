<template>
  <div class="department">
    <div class="search">
      <el-button
        type="link"
        icon="el-icon-arrow-left"
        @click="goBack"
        :style="{ border: 'none', 'margin-right': '20px' }"
      />
      <el-input
        v-model="search"
        size="medium"
        prefix-icon="el-icon-search"
        :style="{ width: '500px' }"
        placeholder="请输入文件名称"
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
            <el-button
              size="mini"
              type="primary"
              :style="{ 'margin-right': '10px' }"
              @click="downloadFiles(scope.row)"
              >下载评定表</el-button
            >
            <el-button size="mini" type="danger" @click="uploadFile(scope.row)"
              >上传评定表</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <UploadFileModal ref="file_modal" />
  </div>
</template>

<script>
import { getTaskList, fileDownLoad } from "./service";
import Table from "@/components/Table.vue";
import UploadFileModal from "@/components/UploadFileModal.vue";
import moment from "moment";
import { downloadFile } from "@/utils/commonFun.js";
export default {
  components: {
    Table,
    UploadFileModal,
  },
  data() {
    return {
      loaded: false,
      pageNo: 1,
      pageSize: 10,
      search: "",
      total: 0,
      dataList: [],
      columns: [
        {
          prop: "articleName",
          label: "文件名",
        },
        {
          prop: "startTime",
          label: "开始时间",
          formatter: (row, column, cellValue, index) => {
            return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
          },
        },
        {
          prop: "endTime",
          label: "结束时间",
          formatter: (row, column, cellValue, index) => {
            return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
          },
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.back();
    },
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getdataList();
    },
    // 上传发布
    uploadFile(data) {
      this.$refs.file_modal.action =
        "/api/system/management/teacher/student/grade/upload";
      this.$refs.file_modal.datas = {
        teacherId: this.$store.state.userInfo.userId,
        studentId: +this.$route.query.studentId,
      };
      this.$refs.file_modal.showModal(); // 打开添加/编辑弹窗
    },
    // 文件下载
    async downloadFiles(data) {
      downloadFile(data);
    },
    async getdataList() {
      try {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
          type: 2, // 成绩评定
        };
        const resp = await getTaskList(params);
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
      this.getdataList();
    },
    // 改变页码
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getdataList();
    },
  },
  created() {},
  mounted() {
    this.getdataList();
  },
};
</script>
<style lang='css' scoped>
.department .search {
  display: flex;
  text-align: left;
  margin-bottom: 20px;
}
</style>