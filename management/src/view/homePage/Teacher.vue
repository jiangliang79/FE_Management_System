<template>
  <div class="class">
    <div class="search">
        <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入教师名称/账号"
        @keyup.enter.native="searchData"
      />
      <!-- <el-button type="primary" @click="addClass">添加</el-button> -->
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
            <el-button size="mini"  type="primary" @click="divideClass(scope.row)"
              >分配班级</el-button
            >
            <!-- <el-button size="mini" type="primary" @click="editClass(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="openDeleteModal(scope.row)"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </Table>
    </div>
    <TeacherClassModal ref="classDivide_modal"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import TeacherClassModal from "@/components/TeacherClassModal.vue";
import moment from "moment";
import { getTeacherList, deleteOrganization } from "./service";
import { delModal } from "@/utils/deleteFun.js";
export default {
  components: {
    Table,
    TeacherClassModal,
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
          prop: "teacherAccountNumber",
          label: "账号",
        },
        {
          prop: "phone",
          label: "联系电话",
          formatter: (row, column, cellValue, index) => {
            return cellValue === 0 ? "--" : cellValue;
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
    divideClass(data) {
      this.$refs.classDivide_modal.form = data;
      this.$refs.classDivide_modal.showModal();
    },
    async getDataList() {
      try {
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        const resp = await getTeacherList(params);
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