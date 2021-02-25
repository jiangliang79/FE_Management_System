import { MessageBox } from 'element-ui';

export function delModal(fn, target, item) {
  MessageBox.confirm(`是否删除${item}?`, '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    fn(target);
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    });          
  });
}