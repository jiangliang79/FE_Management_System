<template>
  <div class="">
    <el-table
      :data="data"
      :style="{ width: '100%' }"
      :default-sort="{ prop: 'createTime', order: 'descending' }"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columns"
        :key="item.label"
        :formatter="item.formatter"
      >
      </el-table-column>
      <slot></slot>
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
    return {};
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$parent.handleSizeChange(pageSize);
    },
    handleCurrentChange(pageNo) {
      this.$parent.handleCurrentChange(pageNo);
    },
  },
};
</script>
<style lang='css' scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>