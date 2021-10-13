<template>
<!--  background-color: #1c2431-->
  <div style="height: 100%;width: 100%;background-color: #1c2431">
    <div style="height:98%;width: 45%;float:left;margin-bottom: 20px">
      <div style="padding: 10px">
<!--          <span style="font-size: 25px;color:white;width:100%;">蓄电池组列表</span>-->
        <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          <el-col style="color: white;font-size: 25px;width:100%;">蓄电池组列表</el-col>
        </el-row>
      </div>
      <el-table
        :data="batteryDetailsTable"
        fit
        highlight-current-row
        style="width: 100%;padding-left: 10px;padding-right: 10px;padding-left: 10px;border-bottom: #01FFFF"
        :header-cell-style="{color:'#01FFFF',fontSize:'23px',align:'center'}"
        :row-style="{fontSize:'23px',color:'white',}"
      >
        <el-table-column label="电池组号" min-width="180px" prop="id" align="center"></el-table-column>
        <el-table-column label="型号" min-width="180px" prop="model" align="center"></el-table-column>
        <el-table-column label="充放电状态" min-width="150px" prop="chargeStatus" align="center"></el-table-column>
        <el-table-column label="网关状态" min-width="150px" prop="gatewayStatus" align="center"></el-table-column>
        <el-table-column label="电池状态" min-width="120px"  prop="batteryStatus" align="center"></el-table-column>
        <el-table-column label="能耗" min-width="150px" prop="energyConsumption" align="center"></el-table-column>
        <el-table-column label="电池组单体详情" min-width="200px" fixed="right" align="center">
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              @click="handleCheck(scope.$index, scope.row)">查看</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--          </template>-->
          <template>
            <el-link href="/sensor/details" type="warning" target="_parent" >查看单体详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height:98%;width: 55%;float:left;margin-bottom: 20px;">
      <div style="padding: 10px 10px 10px 20px;float: left;width: 96%;">
        <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          <el-col style="color: white;font-size: 25px;width:100%;">电池组详情</el-col>
        </el-row>
      </div>
      <div style="padding: 8px 10px 10px 20px;float: left;width: 96%;">
        <el-row class="elRowBase1" :gutter="10">
          <el-col :span="3" >电池组编号</el-col>
          <el-col :span="3" >型号</el-col>
          <el-col :span="5" >信号采集时间</el-col>
          <el-col :span="3" >电池组版本</el-col>
          <el-col :span="3" >4G信号</el-col>
          <el-col :span="3" >主控频率</el-col>
          <el-col :span="2" >在线状态</el-col>
          <el-col :span="2" >报警</el-col>
        </el-row>
        <el-row class="elRowBase2" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          <el-col :span="3" >实验室517</el-col>
          <el-col :span="3" >GFM-200</el-col>
          <el-col :span="5" >2021-09-30 14:07:32</el-col>
          <el-col :span="3" >V1.0.5</el-col>
          <el-col :span="3" >31</el-col>
          <el-col :span="3" >96</el-col>
          <el-col :span="2" style="color: #FF0000">在线</el-col>
          <el-col :span="2" style="color: #FF0000">无</el-col>
        </el-row>
<!--        <div style="padding: 10px 10px 10px 20px;float: left;width: 10%;height:85%;margin-right:20px;background-color: #67ACE4"></div>-->
<!--        <div style="padding: 10px 10px 10px 20px;float: left;width: 82%;height:85%;margin-right:20px;background-color: red"></div>-->
<!--        <div style="padding: 10px 10px 10px 20px;float: left;width: 40%;height:85%;background-color: green"></div>-->
      </div>
<!--      <div style="padding: 10px 10px 10px 20px;float: left;width: 35%;height:10%;"></div>-->
<!--      <div style="padding: 10px 10px 10px 20px;float: left;width: 50%;height:10%;background-color: red"></div>-->
      <div style="padding: 20px 10px 10px 20px;float: left;width: 96%;">
        <el-card style="border:1px solid #01FFFF;border-radius: 20px;width:100%;background-color: transparent" >
          <div slot="header" style="font-size: 25px;color: white">
            <span class="card-title" style="font-size: 25px;color: white">数据监控</span>
          </div>
          <el-row class="elRowBase" style="margin-top: 10px;margin-bottom: 8px" :gutter="10">
            <el-col :span="8" style="margin-left: 10px">
              <el-row>
                <el-col :span="8">
                  <div>
                    <el-card  class="para-card" style="border:1px solid #06F7A1;">
                      <div slot="header" class="header">
                        <span class="card-title" >当前电压</span>
                      </div>
                      <span style="color: #06F7A1;font-size: 40px">1.59 V</span>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="8">
                  <div>
                    <el-card class="para-card" style="border:1px solid #FB932A;">
                      <div slot="header" class="header">
                        <span class="card-title">当前电流</span>
                      </div>
                      <span  style="color: #FB932A;font-size: 40px">1.32 A</span>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="6">
                  <div>
                    <el-card class="para-card" style="border:1px solid #0BEBFA;">
                      <div slot="header" class="header">
                        <span class="card-title">当前SOC</span>
                      </div>
                      <span style="color: #0BEBFA;font-size: 40px">60</span>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div style="padding: 0px 10px 10px 60px;float: left;width: 90%;height:17%">
        <div id="voltageCharts" style="width:88%;height:240px;margin-top: 0px}"></div>
      </div>
      <div style="padding: 0px 10px 10px 60px;float: left;width: 90%;height:17%">
        <div id="currentCharts" style="width:88%;height:240px;margin-top: 0px}"></div>
      </div>
      <div style="padding: 0px 10px 10px 60px;float: left;width: 90%;height:17%">
        <div id="socCharts" style="width:88%;height:240px;margin-top: 0px}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'batteryDetails',
  data () {
    return {
      voltageChart: null,
      currentChart: null,
      socChart: null,
      batteryDetailsTable: [{
        id: '实验室517',
        model: 'GFM-200',
        chargeStatus: '浮充',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室518',
        model: 'GFM-200',
        chargeStatus: '充电',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室519',
        model: 'GFM-200',
        chargeStatus: '浮充',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室520',
        model: 'GFM-200',
        chargeStatus: '充电',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室517',
        model: 'GFM-200',
        chargeStatus: '浮充',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室518',
        model: 'GFM-200',
        chargeStatus: '充电',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室519',
        model: 'GFM-200',
        chargeStatus: '浮充',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }, {
        id: '实验室520',
        model: 'GFM-200',
        chargeStatus: '充电',
        gatewayStatus: '离线',
        batteryStatus: '在线',
        energyConsumption: '0'
      }]
    }
  },
  mounted () {
    this.voltageChartInit()
    this.currentChartInit()
    this.socChartInit()
  },
  methods: {
    voltageChartInit () {
      this.voltageChart = echarts.init(document.getElementById('voltageCharts'))
      const option = {
        title: {
          text: '电压变化情况',
          x: 'center', // 水平安放位置，默认为左对齐，可选为：
          y: 'top',
          textStyle: {
            fontSize: '20',
            color: '#06F7A1'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          data: ['电压(V)'],
          x: 'left',
          y: 'top',
          // 上右下左
          padding: [5, 0, 60, 50],
          textStyle: {
            fontSize: 20,
            color: 'white'
          }
        },
        series: [
          {
            name: '电压(V)',
            data: [3.2, 1.4, 1.5, 2.5, 3.7, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 5.4, 2.4, 1.3, 1.7, 2.8, 3.9, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 6.3],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#06F7A1', // 设置柱子颜色
                label: {
                  show: true, // 柱子上显示值
                  position: 'top', // 值在柱子上方显示
                  textStyle: {
                    color: '#06F7A1', // 值得颜色
                    fontSize: 20
                  }
                }
              }
            }
          }
        ],
        toolbox: {
          show: true,
          x: 'right',
          y: 'top',
          itemSize: 20, // 工具栏 icon 的大小
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          iconStyle: {
            normal: {
              color: 'white'// 设置颜色
            }
          }
        }
      }
      this.voltageChart.setOption(option)
    },
    currentChartInit () {
      this.currentChart = echarts.init(document.getElementById('currentCharts'))
      const option = {
        title: {
          text: '电流变化情况',
          x: 'center', // 水平安放位置，默认为左对齐，可选为：
          y: 'top',
          textStyle: {
            fontSize: '20',
            color: '#FB932A'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          data: ['电流(A)'],
          x: 'left',
          y: 'top',
          // 上右下左
          padding: [5, 0, 60, 50],
          textStyle: {
            fontSize: 20,
            color: 'white'
          }
        },
        series: [
          {
            name: '电流(A)',
            data: [3.2, 1.4, 1.5, 2.5, 3.7, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 5.4, 2.4, 1.3, 1.7, 2.8, 3.9, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 6.3],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#FB932A', // 设置柱子颜色
                label: {
                  show: true, // 柱子上显示值
                  position: 'top', // 值在柱子上方显示
                  textStyle: {
                    color: '#FB932A', // 值得颜色
                    fontSize: 20
                  }
                }
              }
            }
          }
        ],
        toolbox: {
          show: true,
          x: 'right',
          y: 'top',
          itemSize: 20, // 工具栏 icon 的大小
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          iconStyle: {
            normal: {
              color: 'white'// 设置颜色
            }
          }
        }
      }
      this.currentChart.setOption(option)
    },
    socChartInit () {
      this.socChart = echarts.init(document.getElementById('socCharts'))
      const option = {
        title: {
          text: 'SOC变化情况',
          x: 'center', // 水平安放位置，默认为左对齐，可选为：
          y: 'top',
          textStyle: {
            fontSize: '20',
            color: '#0BEBFA'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '2' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '20',
              color: 'white'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          data: ['SOC'],
          x: 'left',
          y: 'top',
          // 上右下左
          padding: [5, 0, 60, 50],
          textStyle: {
            fontSize: 20,
            color: 'white'
          }
        },
        series: [
          {
            name: 'SOC',
            data: [3.2, 1.4, 1.5, 2.5, 3.7, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 5.4, 2.4, 1.3, 1.7, 2.8, 3.9, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 6.3],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#0BEBFA', // 设置柱子颜色
                label: {
                  show: true, // 柱子上显示值
                  position: 'top', // 值在柱子上方显示
                  textStyle: {
                    color: '#0BEBFA', // 值得颜色
                    fontSize: 20
                  }
                }
              }
            }
          }
        ],
        toolbox: {
          show: true,
          x: 'right',
          y: 'top',
          itemSize: 20, // 工具栏 icon 的大小
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          iconStyle: {
            normal: {
              color: 'white'// 设置颜色
            }
          }
        }
      }
      this.socChart.setOption(option)
    }
  }
}
</script>
const echarts = require('echarts')
<style scoped>
body, html{
  width: 100%;
  height: 100%;
}
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
.el-divider__text, .el-link {
  font-size: 23px;
}
/*/deep/ .el-table__body-wrapper tbody tr:hover>td{*/
/*  background-color: rgba(0, 0, 0, 0.3);*/
/*}*/
/*/deep/ .el-table__fixed tbody tr:hover>td {*/
/*  background-color: red;*/
/*}*/
/*#FB932A*/
/deep/ .el-table__body .el-table__row.hover-row td {
  background-color: #FB932A !important;
  font-weight: bolder;
}
.elRowBase1{
  text-align: center;
  color: white;
  font-size: 25px;
}
.elRowBase2{
  text-align: center;
  color: #01FFFF;
  font-size: 25px;
  margin-top: 10px;
}
.card-title{
  font-size:25px;
  font-weight: bold;
  color: white;
}
.text{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.para-card{
  border-radius: 20px;
  width:400px;
  background-color: transparent
}
</style>
