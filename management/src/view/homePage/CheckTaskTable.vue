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
            <el-button size="mini" type="primary" @click="taskPass(scope.row)"
              >通过</el-button
            >
            <el-button size="mini" type="danger" @click="taskRepulse(scope.row)"
              >打回</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <el-dialog title="未通过原因" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="未通过原因"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-input
            v-model="form.remark"
            autocomplete="off"
          ></el-input> </el-form-item
      ></el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { checkList, checkTaskTable } from "./service";
import Table from "@/components/Table.vue";
import moment from "moment";
import { getUserInfo } from "@/utils/commonFun.js";
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
      dataList: [],
      dialogVisible: false,
      checkStatus: 0,
      selectData: {},
      form: {
        remark: "",
      },
      formLabelWidth: "85px",
      rules: {
        remark: [
          { required: true, message: "请输入未通过原因", trigger: "blur" },
        ],
      },
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
    cancel() {
      this.dialogVisible = false;
      this.form.remark = "";
    },
    // 提交原因
    handleOk() {
      this.checkTask(this.selectData);
    },
    searchData() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getdataList();
    },
    // 文件预览
    preview(data) {
      this.pdfUrl =
        window.origin +
        "/api/system/management/article/preview?articleId=" +
        data.articleId;
      var win = window.open(this.pdfUrl);
      win.document.title = data.articleName;
    },
    // 通过
    taskPass(data) {
      this.checkStatus = 0;
      this.checkTask(data);
    },
    // 打回
    taskRepulse(data) {
      this.checkStatus = 1;
      this.selectData = data;
      this.dialogVisible = true;
    },
    // 通过/打回接口函数
    async checkTask(data) {
      let params = {
        taskId: data.taskId,
        status: this.checkStatus,
      };
      if (this.checkStatus === 1) {
        //未通过，填写原因
        params = Object.assign(params, { remark: this.form.remark });
      }
      const resp = await checkTaskTable(params);
      if (resp.status === 200) {
        if (this.checkStatus === 1) {
          // 如果填写未通过原因，成功后，需要关闭弹窗
          this.dialogVisible = false;
          this.form.remark = "";
        }
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getdataList();
      }
    },
    async getdataList() {
      try {
        const params = {
          teacherId: this.$store.state.userInfo.userId, // 老师登陆时需要传老师id,即，当前登陆用户的userId
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        };
        const resp = await checkList(params);
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
    getUserInfos() {
      const userInfo = getUserInfo();
      this.$store.dispatch("getUserInfo", userInfo);
    },
  },
  created() {
    this.getUserInfos();
  },
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