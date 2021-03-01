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
            <el-button size="mini" type="danger" @click="uploadFile(scope.row)"
              >上传</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <UploadFileModal ref="file_modal"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import UploadFileModal from "@/components/UploadFileModal.vue";
import moment from "moment";
import { getStudentTaskList, deleteFile, previewFile } from "./service";
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
      dataList: [],
      total: 0,
      search: "",
      columns: [
        {
          prop: "articleName",
          label: "文件名称",
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
      this.getDataList();
    },
    // 文件预览
    async preview(data) {
      const resp = await previewFile({ articleId: data.articleId });
      if (resp.status === 200) {
        console.log(resp);
        // printOrderTag(params)
        //   .then((data) => {
        //     const content = data;
        //     const blob = new Blob([content]);
        //     var url = window.URL.createObjectURL(blob);
        //     this.pdfUrl =
        //       "./static/pdf/web/viewer.html?file=" + encodeURIComponent(url);
        //     var win = window.open(this.pdfUrl);
        //     setTimeout(() => {
        //       win.document.title = "标题";
        //     }, 500);
        //   })
        //   .catch((response) => {
        //     console.log(response);
        //   });
      }
    },
    // 文件下载
    async downloadFile(data) {
      const resp = await fileDownLoad({ articleId: data.articleId });
    },
    uploadFile(data) {
      this.$refs.file_modal.action =
        "/api/system/management/student/teacher/task/upload";
      this.$refs.file_modal.datas = {
        studentId: this.$store.state.userInfo.userId,
        taskId: data.taskId,
      };
      this.$refs.file_modal.showModal(); // 打开添加/编辑弹窗
    },
    editFile(data) {
      this.$refs.edit_modal.form = data;
      this.$refs.edit_modal.showModal();
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
    openDeleteModal(data) {
      delModal(this.deletePro, data, data.articleName);
    },
    async deletePro(data) {
      try {
        const resp = await deleteFile({
          articleId: data.articleId,
        });
        if (resp.status === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getDataList();
        }
      } catch (e) {}
    },
    async getDataList() {
      try {
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        const resp = await getStudentTaskList(params);
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