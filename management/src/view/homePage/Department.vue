<template>
  <div class="department">
    <div class="search">
      <el-input
        v-model="search"
        size="medium"
        prefix-icon="el-icon-search"
        :style="{ width: '500px' }"
        placeholder="请输入学院名称"
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
import { getCollegeList, deleteOrganization } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
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
      search: "",
      total: 0,
      collegeList: [],
      isAll: false,
      columns: [
        {
          prop: "collegeName",
          label: "学院名称",
        },
        {
          prop: "description",
          label: "备注信息",
        },
        {
          prop: "createTime",
          label: "创建时间",
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
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getdataList();
    },
    openDeleteModal(data) {
      delModal(this.deleteCollege, data, data.collegeName);
    },
    async deleteCollege(data) {
      const resp = await deleteOrganization({ type: 1, id: data.collegeId });
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
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
          isAll: this.isAll,
        };
        const resp = await getCollegeList(params);
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
.department .search {
  text-align: left;
  margin-bottom: 20px;
}
</style>