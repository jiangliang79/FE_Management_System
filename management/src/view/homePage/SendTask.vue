<template>
  <div class="department">
    <div class="search">
      <el-input
        v-model="search"
        size="medium"
        prefix-icon="el-icon-search"
        :style="{ width: '500px' }"
        placeholder="请输入文件名称 / 学生姓名"
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
            <el-button size="mini" @click="preview(scope.row)">预览</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="fileDownLoads(scope.row)"
              >下载文件</el-button
            >
            <el-button size="mini" type="danger" @click="uploadFile(scope.row)"
              >上传发布</el-button
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
import { delModal } from "@/utils/deleteFun.js";
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
            return moment(cellValue).format("YYYY-MM-DD hh:mm:ss");
          },
        },
        {
          prop: "endTime",
          label: "结束时间",
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
    // 上传发布
    uploadFile(data) {
      this.$refs.file_modal.action =
        "/api/system/management/teacher/task/article/release";
      this.$refs.file_modal.datas = {
        teacherId: this.$store.state.userInfo.userId,
      };
      this.$refs.file_modal.showModal(); // 打开添加/编辑弹窗
    },
    async fileDownLoads(data) {
      const fileName = data.articleName;
      fetch(
        "/api/system/management/article/download?articleId=" + data.articleId,
        {
          headers: {
            responseType: "arraybuffer",
            authentication: window.localStorage.getItem("authentication"),
          },
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const downloadURL = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = downloadURL;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(downloadURL);
        });
    },
    async getdataList() {
      try {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
          type: 1, // 任务列表
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
  text-align: left;
  margin-bottom: 20px;
}
</style>