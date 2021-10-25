<template>
    <div style="height: 100%;width: 100%">
      <div style="margin-left: 100px">
        <div id="charts" style="width:98%;height:1400px;}"></div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

const echarts = require('echarts')
export default {
  name: 'Bms',
  data () {
    return {
      voltageChart: null,
      voltage: [],
      resistance: [],
      voltageIndex: [],
      resIndex: [],
      time: [],
      devNum: ''
    }
  },
  mounted () {
    this.devNum = this.$route.query.devNum
    this.chartInit()
    this.getChartData()
  },
  methods: {
    getChartData () {
      const baseUrl = 'http://192.168.0.110:5000/findbycid'
      axios({
        url: baseUrl,
        method: 'get',
        params: {
          // cid: 'sensor' + this.devNum
          cid: this.devNum
        }
      }).then((res) => {
        console.log('--------sensor.devNum-----------' + this.devNum)
        console.log(JSON.stringify(res.data.data))
        const result = res.data.data
        for (let i = 0; i < result.length; i++) {
          this.voltage.push((result[i].Vol / 1000).toFixed(1))
          this.resistance.push(result[i].Res)

          this.voltageIndex.push(i)
          this.resIndex.push(i)

          this.time.push(result[i].ts)
        }
        console.log('纵坐标1------>电压' + this.voltage)
        // console.log('横坐标1------>电压' + this.voltageIndex)
        console.log('纵坐标2------>内阻' + this.resistance)
        // console.log('横坐标2------>soc' + this.socIndex)
        console.log('横坐标------>' + this.time)

        this.voltageChart.setOption({
          xAxis: {
            data: this.time
          },
          series: [
            {
              name: '电压(V)',
              type: 'bar',
              data: this.voltage,
              // 标注
              markPoint: {
                symbolSize: 80, // 控制气泡大小
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              // 标线
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '内阻(μΩ)',
              type: 'bar',
              data: this.resistance,
              markPoint: {
                symbolSize: 80, // 控制气泡大小
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            }
          ]
        })
      })
      // const info = new FormData()
      // info.append('resistance', 'resultresistance')
      // info.append('voltage', 'resultVoltage')
      // info.append('Time', 'Time')
      // console.log(info)
      // getData(info).then(res => {
      //   // alert(JSON.stringify(res.data))
      //   this.voltage = res.data.voltage
      //   this.resistance = res.data.resistance
      //   this.time = res.data.Time
      //   console.log(this.resistance)
      //   console.log(this.voltage)
      //   console.log(this.time)
      //   for (let i = 0; i < this.resistance.length; i++) {
      //     this.resIndex.push(i)
      //   }
      //   for (let j = 0; j < this.voltage.length; j++) {
      //     this.voltageIndex.push(j)
      //   }
      //   console.log('横坐标1------>resIndex' + JSON.stringify(this.resIndex))
      //   console.log('横坐标2------>voltageIndex' + JSON.stringify(this.voltageIndex))
      //   console.log('横坐标3------>Time' + JSON.stringify(this.time))
      //   console.log('纵坐标1------>电流' + this.resistance)
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
      //         name: '内阻(μΩ)',
      //         type: 'line',
      //         data: this.resistance,
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
    chartInit () {
      this.voltageChart = echarts.init(document.getElementById('charts'))
      const option = {
        title: {
          text: '单体电池电压与内阻变化情况',
          x: 'center', // 水平安放位置，默认为左对齐，可选为：
          y: 'top',
          textStyle: {
            fontSize: 25
          },
          // 上右下左
          padding: [20, 0, 50, 0]
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        // 图例
        legend: {
          data: ['电压(V)', '内阻(μΩ)'],
          x: 'left',
          y: 'top',
          // 上右下左
          padding: [80, 0, 50, 80],
          textStyle: {
            fontSize: 25
          }
        },
        grid: {
          top: '16%', // 等价于 y: '16%'
          left: '3%',
          right: '8%',
          bottom: '10%',
          containLabel: true
        },
        // 工具栏：内置有导出图片、数据视图、动态类型切换、数据区域缩放、重置五个工具
        toolbox: {
          show: true, // 是否显示工具栏组件
          feature: {
            /* dataZoom: { // 数据区域缩放，目前只支持直角坐标系的缩放
              yAxisIndex: 'none'
            }, */
            dataView: { readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
            magicType: { type: ['line', 'bar'] }, // 动态类型切换
            restore: {}, // 配置项还原
            saveAsImage: {} // 保存为图片
          },
          itemSize: 25, // 工具栏 icon 的大小
          width: 'auto', // 图例宽度
          height: 'auto', // 图例高度
          x: 'right',
          y: 'top',
          // 上右下左
          padding: [80, 0, 50, 20]
        },
        xAxis: {
          type: 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过data设置类目数据
          // 非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围
          // 可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效['20%', '20%']
          boundaryGap: false,
          data: this.voltageIndex,
          // 设置字体倾斜
          axisLabel: {
            interval: 0,
            rotate: 80,
            // 倾斜度 -90 至 90 默认为0
            margin: 10,
            textStyle: {
              color: '#000000',
              fontSize: '20'
            }
          }
          // axisLabel: {
          //   textStyle: {
          //     fontSize: '25'
          //   }
          // }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: '25'
            }
          }
          /* axisLabel: {
            formatter: '{value} °C'
          } */
        },
        series: [
          {
            name: '电压(V)',
            type: 'bar',
            data: this.voltage,
            // 标注
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ],
              label: {
                normal: {
                  textStyle: {
                    fontSize: '20'
                  }
                }
              }
            },
            // 标线
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ],
              label: {
                normal: {
                  textStyle: {
                    fontSize: '25'
                  }
                }
              }
            }
          },
          {
            name: '内阻(μΩ)',
            type: 'bar',
            data: this.resistance,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ],
              label: {
                normal: {
                  textStyle: {
                    fontSize: '20'
                  }
                }
              }
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ],
              label: {
                normal: {
                  textStyle: {
                    fontSize: '25'
                  }
                }
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.voltageChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
