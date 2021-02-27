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
              @click="downloadFile(scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
</template>

<script>
import { getFileList, fileDownLoad } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
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
      search: "",
      total: 0,
      collegeList: [],
      isAll: false,
      columns: [
        {
          prop: "studentName",
          label: "学生",
        },
        {
          prop: "articleName",
          label: "文件名",
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
          prop: "updateTime",
          label: "更新日期",
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
    // 文件预览
    preview(data) {},
    // 文件下载
    async downloadFile(data) {
      const resp = await fileDownLoad({ articleId: data.articleId });
    },
    async getdataList() {
      try {
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        const resp = await getFileList(params);
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