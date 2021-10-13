<template>
    <div>
      <div id="charts" style="width:100%;height:700px;}"></div>
      <div><el-button @click="getV">获取电压</el-button></div>
      <div><el-button @click="getAll">获取所有数据</el-button></div>
    </div>
</template>

<script>
import { getData, getAllData } from '../../network/network'
const echarts = require('echarts')
export default {
  name: 'manage',
  data () {
    return {
      voltageChart: null,
      list: [],
      currentIndex: [],
      voltageIndex: [],
      num: [],
      current: [],
      voltage: []
    }
  },
  mounted () {
    this.volChartInit()
    this.getChartData()
  },
  methods: {
    getChartData () {
      const info = new FormData()
      info.append('current', 'resultCurrent')
      info.append('voltage', 'resultVoltage')
      console.log(info)
      getData(info).then(res => {
        // alert(JSON.stringify(res.data))
        this.current = res.data.current
        this.voltage = res.data.voltage
        console.log(this.current)
        console.log(this.voltage)
        for (let i = 0; i < this.current.length; i++) {
          this.currentIndex.push(i + 1)
        }
        for (let j = 0; j < this.voltage.length; j++) {
          this.voltageIndex.push(j + 1)
        }
        console.log('横坐标1------>currentIndex' + this.currentIndex)
        console.log('横坐标2------>voltageIndex' + this.voltageIndex)
        console.log('纵坐标1------>电流' + this.current)
        console.log('纵坐标2------>电压' + this.voltage)
        this.voltageChart.setOption({
          xAxis: {
            data: this.currentIndex
          },
          series: [
            {
              name: '电压',
              data: this.current
            }]
        })
      })
    },
    getA () {
      const info = new FormData()
      info.append('current', 'resultCurrent')
      info.append('voltage', 'resultVoltage')
      console.log(info)
      getData(info).then(res => {
        alert(res.data)
        this.list = res.data
        // this.list = JSON.stringify(res.data)
        for (let i = 0; i < this.list.length; i++) {
          this.index.push(i + 1)
        }
        // console.log('横坐标------>' + JSON.stringify(this.index))
        this.num = this.list
        console.log('纵坐标------>' + this.num)
        this.voltageChart.setOption({
          xAxis: {
            data: this.index
          },
          series: [
            {
              name: '电压',
              data: this.num
            }]
        })
      })
    },
    getAll () {
      getAllData().then(res => {
        alert(JSON.stringify(res.data))
      })
    },
    volChartInit () {
      this.voltageChart = echarts.init(document.getElementById('charts'))
      const option = {
        title: {
          text: '电压变化情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['电压(V)']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.index
          // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} V'
          }
        },
        series: [
          {
            name: '电压(V)',
            type: 'line',
            data: this.num,
            // data: ['1.3', '1.6', '1.4', '1.2', '1.7', '1.1', '1.3', '1.5', '1.2', '1.9'],
            markPoint: {
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
      }
      // 使用刚指定的配置项和数据显示图表。
      this.voltageChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
