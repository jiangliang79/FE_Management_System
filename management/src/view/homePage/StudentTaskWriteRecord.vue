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
            <el-button size="mini" type="primary" @click="downloadFile(scope.row)"
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
import { delModal } from "@/utils/deleteFun.js";
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
          // formatter: (row, column, cellValue, index) => {
          //   return moment(cellValue).format("YYYY-MM-DD hh:mm:ss");
          // },
        },
        {
          prop: "releaseTime",
          label: "上传发布时间",
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
    async downloadFile(data) {
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
  },
  created() {},
  mounted() {
    this.getDataList();
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
.search {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 20px;
}
</style>