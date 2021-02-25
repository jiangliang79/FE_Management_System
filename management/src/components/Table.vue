<template>
  <div class="">
    <el-table
      row-key="userId"
      :data="data"
      :style="{ width: '100%' }"
      :default-sort="{ prop: 'createTime', order: 'descending' }"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columns"
        :key="item.label"
      >
      </el-table-column>
      <!-- <el-table-column prop="options" label="操作" key="options"> -->
      <slot></slot>
      <!-- </el-table-column> -->
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next,sizes"
      :total="total"
      class="pagination"
      :page-sizes="[10, 20, 50, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "table",
  props: {
    data: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  components: {},
  data() {
    return {
      // userList: [],
      // columns : [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleSizeChange(pageSize) {
      this.$parent.handleSizeChange(pageSize);
    },
    handleCurrentChange(pageNo) {
      this.$parent.handleCurrentChange(pageNo);
    },
  },
  created() {},
  mounted() {},
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
.pagination {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>