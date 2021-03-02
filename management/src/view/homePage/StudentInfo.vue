<template>
  <div class="class">
    <div class="search">
        <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        size="medium"
        :style="{ width: '500px' }"
        placeholder="请输入学生姓名 / 班级名称 / 学院名称 / 专业名称搜索"
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
      <el-table-column
      prop="status"
      label="填表状态"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 0 ? 'danger' : 'success'"
          disable-transitions>{{scope.row.status === 0 ? '未完成' : '完成'}}</el-tag>
      </template>
    </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openDetailModal(scope.row)"
              >详细信息</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <StudentInfoDetailModal ref="info_modal"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import StudentInfoDetailModal from "@/components/StudentInfoDetailModal.vue";
import moment from "moment";
import { getStudentList } from "./service";
export default {
  components: {
    Table,
    StudentInfoDetailModal,
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
          prop: "studentName",
          label: "学生姓名",
        },
        {
          prop: "className",
          label: "班级",
        },
        {
          prop: "professionName",
          label: "所属专业",
        },
        {
          prop: "collegeName",
          label: "所属学院",
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
    openDetailModal(data) {
      this.$refs.info_modal.info = data;
      this.$refs.info_modal.showModal();
    },
    async getDataList() {
      try {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        if (this.$store.state.userInfo.type === 3) {
          // 学院部分
          params = Object.assign(params, {
            collegeId: this.$store.state.userInfo.userId,
          });
        } else if (this.$store.state.userInfo.type === 2) {
          // 老师部分
          params = Object.assign(params, {
            teacherId: this.$store.state.userInfo.userId,
          });
        }
        const resp = await getStudentList(params);
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