<template>
<v-app class="record">
  <v-container>
    <h1>学习记录</h1>
    <v-container>
      <h2>答题记录</h2>
      <ag-grid-vue style="width: 850px; height: 400px;"
                   class="ag-theme-alpine"
                   :columnDefs="columnDefs"
                   :rowData="problemHistory">
      </ag-grid-vue>
    </v-container>
    <v-container>
      <h2>正确率</h2>
<!--      <ve-pie :data="accuracy"></ve-pie>-->
      <div id="chartPie" class="pie-wrap"></div>
    </v-container>
    <v-container>
      <h2>历史答题数</h2>
      <div id="chartLine" class="line-wrap"></div>
    </v-container>
  </v-container>
</v-app>
</template>

<script>
  import { AgGridVue } from "ag-grid-vue";
  import * as echarts from 'echarts';
  require('echarts/theme/macarons');
  require('echarts/theme/shine')
export default {
  components:{ AgGridVue},
  name: "Record",
  props: ['parent'],
  data () {
    return {
      app:this.$root.$children[0],
      columnDefs:[{field:"problemId"},{field:"answer"},{field:"accurate"},{field:"time"}],
      problemHistory:[],
      historyChart:{columns:['日期','做题数'],rows:[]},
      pieChart: {
        tooltip: {
          trigger: 'item',
          backgroundColor:'#fff'
        },
        series: [
          {
            name: '答题数',
            type: 'pie',
            radius: '80%',
            data: [
              {value: 0, name: '正确'},
              {value: 0, name: '错误'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      lineChart:{
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'bar'
        }],
        grid:[{
          show:false,
          zlevel:0,
          z:0,
          left:"10%",
          top:60,
          right:"10%",
          bottom:70,
          containLabel:false,
          backgroundColor:"rgba(0,0,0,0)",
          borderWidth:1,
          borderColor:"#ccc"

        }],
      },
      chartPie:null,
      chartLine:null,
    }
  },

  methods: {
    getProblemHistory(){
      this.$axios.get("/getProblemHistory")
              .catch(() => {})
              .then(res => {
                if (res)
                {
                  if (res.data.responseCode === 200)
                  {
                    if(res.data.responseBody){
                      this.problemHistory = res.data.responseBody;
                      for(let i = 0; i < this.problemHistory.length;i++){
                        if(this.problemHistory[i].accurate)this.pieChart.series[0].data[0].value++;
                        else this.pieChart.series[0].data[1].value++;
                        if(this.historyChart.rows[this.problemHistory[i].time])this.historyChart.rows[this.problemHistory[i].time]++;
                        else {
                          this.historyChart.rows[this.problemHistory[i].time] = 1;
                        }
                      }
                    }
                    console.log(this.lineChart);
                    for(let key in this.historyChart.rows){
                      (this.lineChart.xAxis.data).push(key);
                      (this.lineChart.series[0].data).push(this.historyChart.rows[key]);
                    }
                    this.$nextTick(()=>this.drawPieChart());
                    this.$nextTick(()=>this.drawLineChart());
                    console.log(this.historyChart);
                    console.log(this.pieChart);
                  }
                  else
                  {
                    this.app.notify(res.data.responseMessage, "error");
                  }

                  return;
                }

                this.app.notify("服务器错误，请重试", "error");
              });
    },
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
      this.chartPie.setOption(this.pieChart);
    },
    drawLineChart(){
      this.chartLine = echarts.init(document.getElementById('chartLine'),'shine');
      this.chartLine.setOption(this.lineChart);
    }
  },

  mounted() {
    this.getProblemHistory();

  }
}
</script>

<style scoped>
  @import "../../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../../../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
  .pie-wrap{
    width:100%;
    height:400px;
  }
  .line-wrap{
    width:50%;
    height:400px;
  }
</style>
