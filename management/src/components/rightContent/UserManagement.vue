<template>
  <div class="user-manage">
    <div class="option"></div>
    <div class="table">

    </div>
  </div>
</template>

<script>
import { userList } from '../service';
export default {
  components: {},
  data () {
    return {
      loading: false,
      pageNo: 1,
      pageSize: 20,
      search: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getUserList () {
      console.log(111);
      this.loading = true;
        const params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          search: this.search,
        }
        console.log(params);
        const resp = await userList(params);
        console.log(resp);
    }
  },
  created () { },
  mounted () {
    console.log(this.pageNo++);
    this.getUserList();
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style lang='css' scoped>
</style>