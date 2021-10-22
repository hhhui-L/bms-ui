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
        :data="batteryListTable"
        fit
        highlight-current-row
        style="width: 100%;padding-left: 10px;padding-right: 10px;padding-left: 10px;border-bottom: #01FFFF"
        :header-cell-style="{color:'#01FFFF',fontSize:'23px',align:'center'}"
        :row-style="{fontSize:'23px',color:'white',}"
      >
        <el-table-column label="公司名称" min-width="200px" prop="corp_name" align="center"></el-table-column>
        <el-table-column label="id" v-if="false" min-width="150px" prop="id" align="center"></el-table-column>
        <el-table-column label="设备编号" min-width="150px" prop="dev_num" align="center"></el-table-column>
        <el-table-column label="设备类型" min-width="150px" prop="dev_type" align="center"></el-table-column>
<!--        <el-table-column label="调试状态" min-width="150px" prop="dev_debug" align="center"></el-table-column>-->
        <el-table-column label="控制器编号" min-width="150px" prop="ctrl_num" align="center"></el-table-column>
<!--        <el-table-column label="创建时间" min-width="200px" prop="create_time" align="center"></el-table-column>-->
        <el-table-column label="设备ID" min-width="200px" prop="dev_id" align="center"></el-table-column>
<!--        <el-table-column label="对应电池编号" min-width="200px" prop="bat_model" align="center"></el-table-column>-->
<!--        <el-table-column label="设备SN码" min-width="200px" prop="dev_sn" align="center"></el-table-column>-->
        <el-table-column label="电池组单体详情" min-width="200px" fixed="right" align="center">
<!--          <template>-->
<!--            <el-link href="/sensor/details" type="warning" target="_parent" >查看单体详情</el-link>-->
<!--          </template>-->
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="background-color: transparent;border: none;color:#FB932A;font-size: 23px"
              @click="sensorDetails(scope.row)">查看电池单体详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="msg-pagination-container"
        :page-sizes="pageSizeList"
        style="margin-top: 8px"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        align="right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
          <el-col :span="3" >{{ this.devNum }}</el-col>
          <el-col :span="3" >{{ this.devType }}</el-col>
          <el-col :span="5" >{{ this.time }}</el-col>
          <el-col :span="3" >{{ this.TolVer }}</el-col>
          <el-col :span="3" >{{ this.CellVer }}</el-col>
          <el-col :span="3" >{{ this.debugDetail }}</el-col>
          <el-col :span="2" style="color: #FF0000">{{ this.batStatus }}</el-col>
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
                      <span style="color: #06F7A1;font-size: 40px">{{this.packStatus.values.TolVolt+' V'}}</span>
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
                      <span  style="color: #FB932A;font-size: 40px">{{this.packStatus.values.TolCur +' A'}}</span>
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
                      <span style="color: #0BEBFA;font-size: 40px">{{this.packStatus.values.Soc}}</span>
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
import { getChartData, getPacklist } from '@/network/packDetails'
import axios from 'axios'
import { toDate } from '@/network/time'

export default {
  name: 'batteryDetails',
  data () {
    return {
      voltageChart: null,
      currentChart: null,
      socChart: null,
      batteryListTable: [],
      listInfo: {
        corpname: '湖南大学实验室',
        devnum: '',
        devtype: '',
        pagenum: '0',
        pagesize: '10'
      },
      packid: '',
      packStatus: [],
      status: [],
      batStatus: '0',
      devNum: '0',
      devType: '0',
      TolVer: '0',
      CellVer: '0',
      debugDetail: '0',
      time: '0',
      totalCount: 400, // 总条目数
      pageSizeList: [10, 20, 50, 100], // 选择每页显示个数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条目数
      dataIndex: 1,
      current: [],
      voltage: [],
      soc: [],
      currentIndex: [],
      voltageIndex: [],
      socIndex: []
      // packid: '1e3a83caa4154ac39c8e82118f8ad3a5'
    }
  },
  mounted () {
    this.getBatteryList()
    this.voltageChartInit()
    this.currentChartInit()
    this.socChartInit()
    this.getChartData()
  },
  methods: {
    getBatteryList () {
      getPacklist(this.listInfo).then(res => {
        console.log('---this.listInfo--' + JSON.stringify(this.listInfo))
        console.log('-----' + JSON.stringify(res.data))
        this.batteryListTable = res.data.content
        this.packid = res.data.content[0].dev_id
        this.devNum = res.data.content[0].dev_num
        this.devType = res.data.content[0].dev_type
        console.log('--this.packid---' + this.packid)
        this.getPackDetails()
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    getPackDetails () {
      // const baseUrl = 'http://192.168.0.122:5000/dash/packstatus'
      const baseUrl = 'http://192.168.0.110:5000/dash/packstatus'
      const url = baseUrl + '?packid=' + this.packid
      // console.log('--------url---------' + url)
      axios({
        url: url,
        method: 'post'
      }).then((res) => {
        console.log(res.data)
        this.status = res.data
        const index = this.status.length - 1
        this.packStatus = this.status[index]
        if (this.packStatus.values.Status === 1) {
          this.batStatus = '浮充'
        } else if (this.packStatus.values.Status === 2) {
          this.batStatus = '均充'
        } else if (this.packStatus.values.Status === 3) {
          this.batStatus = '放电'
        }
        this.TolVer = this.packStatus.values.TolVer
        this.CellVer = this.packStatus.values.CellVer
        this.debugDetail = this.packStatus.values.DebugDetail
        this.time = toDate(this.packStatus.ts)
        console.log('--------packStatus---------' + JSON.stringify(this.packStatus))
      })
    },
    getChartData () {
      // const info = new FormData()
      // info.append('cid', 'battery100')
      // console.log(info)
      // getChartData(info).then(res => {
      //   console.log('-----' + JSON.stringify(res.data))
      // })
      const baseUrl = 'http://192.168.0.110:5000/findbycid'
      // const url = baseUrl + '?cid=battery100'
      // console.log('--------url---------' + url)
      axios({
        url: baseUrl,
        method: 'get',
        params: {
          cid: 'battery100'
        }
      }).then((res) => {
        console.log(JSON.stringify(res.data))
        const result = res.data.data
        console.log('-----result-----------' + JSON.stringify(result))
        console.log(result[0].tolvolt)
        for (let i = 0; i < result.length; i++) {
          this.voltage.push((result[i].tolvolt / 10).toFixed(1))
          this.current.push((result[i].tolcur).toFixed(1))
          this.soc.push(result[i].soc)
          this.voltageIndex.push(i)
          this.currentIndex.push(i)
          this.socIndex.push(i)
        }
        console.log('纵坐标1------>电压' + this.voltage)
        console.log('横坐标1------>电压' + this.voltageIndex)
        console.log('纵坐标2------>电流' + this.current)
        console.log('横坐标2------>电流' + this.currentIndex)
        console.log('纵坐标3------>soc' + this.soc)
        console.log('横坐标3------>soc' + this.socIndex)

        this.voltageChart.setOption({
          xAxis: {
            data: this.voltageIndex
          },
          series: [
            {
              name: '电压(V)',
              data: this.voltage,
              type: 'bar'
            }
          ]
        })

        this.currentChart.setOption({
          xAxis: {
            data: this.currentIndex
          },
          series: [
            {
              name: '电压(V)',
              data: this.current,
              type: 'bar'
            }
          ]
        })

        this.socChart.setOption({
          xAxis: {
            data: this.socIndex
          },
          series: [
            {
              name: '电压(V)',
              data: this.soc,
              type: 'bar'
            }
          ]
        })
      })
      // getChartData(info).then(res => {
      //   console.log(JSON.stringify(res.data))
      //   this.current = res.data.current
      //   this.voltage = res.data.voltage
      //   this.time = res.data.Time
      //   console.log(this.current)
      //   console.log(this.voltage)
      //   console.log(this.time)
      //   for (let i = 0; i < this.current.length; i++) {
      //     this.currentIndex.push(i)
      //   }
      //   for (let j = 0; j < this.voltage.length; j++) {
      //     this.voltageIndex.push(j)
      //   }
      //   console.log('横坐标1------>currentIndex' + JSON.stringify(this.currentIndex))
      //   console.log('横坐标2------>voltageIndex' + JSON.stringify(this.voltageIndex))
      //   console.log('横坐标3------>Time' + JSON.stringify(this.time))
      //   console.log('纵坐标1------>电流' + this.current)
      //   console.log('纵坐标2------>电压' + this.voltage)
      //   this.voltageChart.setOption({
      //     xAxis: {
      //       data: this.time
      //     },
      //     series: [
      //       {
      //         name: '电压(V)',
      //         type: 'line',
      //         data: this.voltage,
      //         // 标注
      //         markPoint: {
      //           symbolSize: 80, // 控制气泡大小
      //           data: [
      //             { type: 'max', name: '最大值' },
      //             { type: 'min', name: '最小值' }
      //           ]
      //         },
      //         // 标线
      //         markLine: {
      //           data: [
      //             { type: 'average', name: '平均值' }
      //           ]
      //         }
      //       },
      //       {
      //         name: '电流(A)',
      //         type: 'line',
      //         data: this.current,
      //         markPoint: {
      //           symbolSize: 80, // 控制气泡大小
      //           data: [
      //             { type: 'max', name: '最大值' },
      //             { type: 'min', name: '最小值' }
      //           ]
      //         },
      //         markLine: {
      //           data: [
      //             { type: 'average', name: '平均值' }
      //           ]
      //         }
      //       }
      //     ]
      //   })
      // })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.listInfo.pagesize = val
      console.log('---this.listInfo--' + JSON.stringify(this.listInfo))
      this.getBatteryList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.listInfo.pagenum = val - 1
      this.dataIndex = (this.listInfo.pagenum * this.listInfo.pagesize) + 1
      console.log('---this.listInfo--' + JSON.stringify(this.listInfo))
      this.getBatteryList()
    },
    sensorDetails (val) {
      // console.log(val.dev_id)
      this.$router.push({
        path: '/sensor/details',
        query: {
          packid: val.dev_id,
          dev_num: val.dev_num,
          dev_type: val.dev_type
        }
      })
    },
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
          data: this.voltageIndex,
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
            data: this.voltage,
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
          data: this.currentIndex,
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
            data: this.current,
            // data: [3.2, 1.4, 1.5, 2.5, 3.7, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 5.4, 2.4, 1.3, 1.7, 2.8, 3.9, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 6.3],
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
          data: this.socIndex,
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
            data: this.soc,
            // data: [3.2, 1.4, 1.5, 2.5, 3.7, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 5.4, 2.4, 1.3, 1.7, 2.8, 3.9, 1.7, 1.8, 2.4, 1.9, 4.8, 6.7, 3.5, 6.9, 7.8, 6.3],
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
/deep/ .el-pagination__total {
  margin-right: 10px;
  font-weight: 400;
  color: white;
}
/deep/ .el-pagination__jump {
  margin-left: 24px;
  font-weight: 400;
  color: white;
}
</style>
