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

export function downLoadFile(data) {
  const fileName = data.articleName;
      fetch(
        "/api/system/management/article/download?articleId=" + data.articleId,
        {
          headers: {
            responseType: "arraybuffer",
            authentication: window.localStorage.getItem("authentication"),
          },
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const downloadURL = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = downloadURL;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(downloadURL);
        });
}