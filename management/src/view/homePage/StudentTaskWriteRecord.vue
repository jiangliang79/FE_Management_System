<template>
  <div class="profession">
    <div class="table">
      <Table
        :data="dataList"
        :columns="columns"
        :total="total"
        v-if="loaded"
        :pageNo="pageNo"
        :pageSize="pageSize"
      >
      <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="preview(scope.row)"
              >预览</el-button
            >
            <el-button size="mini" type="primary" @click="downloadFiles(scope.row)"
              >下载</el-button
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
import { getStudentTaskrecord, previewFile } from "./service";
import { downloadFile, getUserInfo } from "@/utils/commonFun.js";
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
          prop: "articleName",
          label: "文件名称",
        },
        {
          prop: "status",
          label: "状态",
          formatter: (row, column, cellValue, index) => {
            return cellValue === 0 ? "通过" : "未通过";
            // return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
          },
        },
        {
          prop: "releaseTime",
          label: "上传发布时间",
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
    // 文件预览
    preview(data) {
      this.pdfUrl =
        window.origin +
        "/api/system/management/article/preview?articleId=" +
        data.articleId;
      var win = window.open(this.pdfUrl);
      win.document.title = data.articleName;
    },
    // 文件下载
    async downloadFiles(data) {
      downloadFile(data);
    },
    getFileTable(type) {
      switch (type) {
        case 1:
          return "老师评分表";
        case 2:
          return "学生填写表";
        case 3:
          return "实习任务表";
        default:
          return "";
      }
    },
    async getDataList() {
      try {
        const params = {
          studentId: this.$store.state.userInfo.userId,
        };
        const resp = await getStudentTaskrecord(params);
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