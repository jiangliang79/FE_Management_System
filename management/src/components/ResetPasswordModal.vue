<template>
  <el-dialog
    title="重置密码"
    :visible.sync="resetPasswordVisible"
    width="550px"
  >
    <div class="item">
      <div :style="{ width: '70px' }">
        <span :style="{ color: 'red' }">*</span><span>新密码：</span>
      </div>
      <el-input
        v-model="password"
        placeholder="请输入密码"
        show-password
        :style="{ flex: '1' }"
      ></el-input>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ediPassword } from "@/view/homePage/service.js";
export default {
  props: {
    userId: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      resetPasswordVisible: false,
      password: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showModal() {
      this.resetPasswordVisible = true;
    },
    cancel() {
      this.resetPasswordVisible = false;
      this.password = "";
    },
    async handleOk() {
      if (this.password === "") {
        this.$message({
          message: "请输入新密码",
          type: "error",
        });
        return;
      }
      const params = {
        password: this.password,
        userId: this.$props.userId,
      };
      const resp = await ediPassword(params);
      if (resp.status === 200) {
        this.$message({
          message: "密码重置成功",
          type: "success",
        });
        this.resetPasswordVisible = false;
        this.password = "";
      }
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
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>