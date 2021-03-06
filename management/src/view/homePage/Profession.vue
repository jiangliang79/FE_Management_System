<template>
  <div class="profession">
    <div class="search">
        <el-input
        v-model="search"
        size="medium"
        prefix-icon="el-icon-search"
        :style="{ width: '500px' }"
        placeholder="请输入专业名称 / 学院名称搜索"
        @keyup.enter.native="searchData"
      />
      <el-button type="primary" @click="addPro">添加</el-button>
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
            <el-button size="mini" type="primary" @click="editPro(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="openDeleteModal(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <ProfessionModal ref="pro_modal"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import ProfessionModal from "@/components/ProfessionModal.vue";
import moment from "moment";
import { getProfessionList, deleteOrganization } from "./service";
import { delModal } from "@/utils/commonFun.js";
export default {
  components: {
    Table,
    ProfessionModal,
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
          prop: "professionName",
          label: "专业名称",
        },
        {
          prop: "collegeName",
          label: "所属学院",
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
        {
          prop: "updateTime",
          label: "修改时间",
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
      this.getDataList();
    },
    addPro() {
      this.$refs.pro_modal.showModal(); // 打开添加/编辑弹窗
    },
    editPro(data) {
      this.$refs.pro_modal.operatorType = 1;
      this.$refs.pro_modal.form = data;
      this.$refs.pro_modal.showModal();
    },
    openDeleteModal(data) {
      delModal(this.deletePro, data, data.professionName);
    },
    async deletePro(data) {
      try {
        const resp = await deleteOrganization({
          type: 2,
          id: data.professionId,
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
        const resp = await getProfessionList(params);
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