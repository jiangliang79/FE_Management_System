<template>
  <el-dialog title="学生详细信息" :visible.sync="infoVisible" width="30%">
    <div class="item">
      <span class="label">姓名：</span>
      <span class="text">{{ info.studentName }}</span>
    </div>
    <div class="item">
      <span class="label">性别：</span>
      <span class="text">{{ info.sex === 0 ? "男" : "女" }}</span>
    </div>
    <div class="item">
      <span class="label">班级：</span>
      <span class="text">{{ info.className }}</span>
    </div>
    <div class="item">
      <span class="label">专业：</span>
      <span class="text">{{ info.professionName }}</span>
    </div>
    <div class="item">
      <span class="label">学院：</span>
      <span class="text">{{ info.collegeName }}</span>
    </div>
    <div class="item">
      <span class="label">学号：</span>
      <span class="text">{{
        info.studentNumber === 0 ? null : info.studentNumber
      }}</span>
    </div>
    <div class="item">
      <span class="label">籍贯：</span>
      <span class="text">{{ info.nativePlace }}</span>
    </div>
    <div class="item">
      <span class="label">现居住地：</span>
      <span class="text">{{ info.nowPlace }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="infoVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      infoVisible: false,
      info: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹窗
    showModal() {
      this.infoVisible = true;
    },
  },
};
</script>
<style lang='css' scoped>
.item {
  text-align: left;
  margin-bottom: 10px;
  margin-left: 20px;
}
.label {
  font-weight: 600;
  margin-right: 10px;
}
.text {
  font-weight: 400;
}
</style>