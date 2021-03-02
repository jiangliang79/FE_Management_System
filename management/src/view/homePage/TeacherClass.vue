<template>
  <div class="class">
    <div class="search">
        <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入教师名称 / 班级名称搜索"
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
            <el-button size="mini" type="danger" @click="openDeleteModal(scope.row)"
              >删除</el-button
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
import { getTeacherClassList, deleteTeacherClass } from "./service";
import { delModal } from "@/utils/commonFun.js";
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
          prop: "teacherName",
          label: "姓名",
        },
        {
          prop: "phone",
          label: "联系电话",
          formatter: (row, column, cellValue, index) => {
            return cellValue === 0 ? "--" : cellValue;
          },
        },
        {
          prop: "professionName",
          label: "所属专业",
        },
        {
          prop: "collegeName",
          label: "所属学院",
        },
        {
          prop: "className",
          label: "管理班级",
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
    openDeleteModal(data) {
      delModal(
        this.deletePro,
        data,
        `${data.teacherName}管理的${data.className}`
      );
    },
    async deletePro(data) {
      try {
        const resp = await deleteTeacherClass({
          recordId: data.recordId,
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
        const resp = await getTeacherClassList(params);
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