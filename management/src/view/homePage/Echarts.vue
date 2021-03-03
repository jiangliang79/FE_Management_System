<template>
  <div class="echarts">
    <div class="circle">
      <div
        id="studenAttendance_echart"
        :style="{
          width: '400px',
          height: '400px',
          margin: '10px 50px 0px 50px',
        }"
      ></div>
      <div
        id="stduentScore_echart"
        :style="{
          width: '400px',
          height: '400px',
          margin: '10px 50px 0px 50px',
        }"
      ></div>
      <div class="upload">
        <el-upload
          class="upload-demo"
          action="/api/system/management/article/upload"
          :before-remove="beforeRemove"
          :headers="headers"
          multiple
          :file-list="fileList"
        >
          <el-button size="small" type="primary">上传文件</el-button>
        </el-upload>
      </div>
    </div>
    <div
      id="relation_echart"
      :style="{ width: '500px', height: '400px', margin: '10px 50px 0px 50px' }"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getStudentAttendance, getStudentScore, getRelation } from "./service";
let tocken = window.localStorage.getItem("authentication")
  ? window.localStorage.getItem("authentication")
  : null;
export default {
  components: {},
  data() {
    return {
      data: [],
      fileList: [],
      headers: {
        authentication: tocken,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async getStuAtt() {
      const resp = await getStudentAttendance({});
      if (resp.status === 200) {
        this.data = resp.data.list || [];
        this.drawLine(this.data);
      }
    },
    async getStuScor() {
      const resp = await getStudentScore({});
      if (resp.status === 200) {
        this.data = resp.data.list || [];
        this.getStudentScoreEcharts(this.data);
      }
    },
    async getRelations() {
      const resp = await getRelation({});
      if (resp.status === 200) {
        this.data = resp.data.list || [];
        this.getRelationEcharts(this.data);
      }
    },
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("studenAttendance_echart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "学生出勤率",
          // subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            // data: [
            //   { value: 1048, name: "搜索引擎" },
            //   { value: 735, name: "直接访问" },
            //   { value: 580, name: "邮件营销" },
            //   { value: 484, name: "联盟广告" },
            //   { value: 300, name: "视频广告" },
            // ],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    getStudentScoreEcharts(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("stduentScore_echart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "学生成绩占比",
          // subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "25",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            // data: [
            //   { value: 1048, name: "搜索引擎" },
            //   { value: 735, name: "直接访问" },
            //   { value: 580, name: "邮件营销" },
            //   { value: 484, name: "联盟广告" },
            //   { value: 300, name: "视频广告" },
            // ],
            data: data,
          },
        ],
      });
    },
    getRelationEcharts(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("relation_echart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "学生出勤率和成绩的关系分布",
          left: "center",
          top: 0,
        },
        xAxis: {
          type: "value",
          name: "出勤率",
          min: 0,
          max: 1,
        },
        yAxis: {
          type: "value",
          name: "成绩",
          min: 0,
          max: 100,
        },
        series: [
          {
            // name: ["[出勤率，成绩]"],
            symbolSize: 15,
            // data: [
            //   [0.1, 58.04],
            //   [0.07, 60.95],
            //   [0.2, 70.58],
            //   [0.3, 90.5],
            //   [0.9, 80.6],
            //   [0.8, 76],
            //   [0.4, 67],
            //   [0.5, 57],
            //   [0.6, 47],
            //   [0.7, 97],
            //   [0.8, 87],
            // ],
            data: data,
            type: "scatter",
          },
        ],
      });
    },
  },
  created() {},
  mounted() {
    this.getStuAtt();
    this.getStuScor();
    // this.drawLine();
    this.getRelations();
    // this.getStudentScoreEcharts();
    // this.getRelationEcharts();
  },
};
</script>
<style lang='css' scoped>
.echarts {
}
.circle {
  display: flex;
}
.upload {
  margin-left: 80px;
  margin-top: 20px;
  /* display: none; */
}
</style>