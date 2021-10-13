<template>
  <div style="height: 100%;width: 100%;background-color: #1c2431">
    <div style="height:98%;width: 45%;float:left;margin-bottom: 20px">
      <div style="padding: 10px;">
        <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          <el-col style="color: white;font-size: 25px;width:100%;">电池组详细信息</el-col>
        </el-row>
      </div>
      <div style="padding: 10px;float: left;width: 96%;height: 15%;">
        <div style="padding: 8px;float: left;width: 15%;height:85%;margin-right:10px;">
<!--          <div style="margin-top: 15%;margin-left:10px;font-size: 25px;color: white">电池组编号</div>-->
          <div style="font-size: 32px;color: #01FFFF;margin-top: 50px">实验室517</div>
        </div>
        <div style="padding: 8px;float: left;width: 35%;height:85%;margin-right:10px;">
          <el-row class="elRowBase4" :gutter="10">
            <el-col :span="12">型号</el-col>
            <el-col :span="12" style="color: #01FFFF">GFM-200</el-col>
          </el-row>
          <el-row class="elRowBase4" :gutter="10">
            <el-col :span="12">主控频率</el-col>
            <el-col :span="12" style="color: #01FFFF">96</el-col>
          </el-row>
          <el-row class="elRowBase4" :gutter="10">
            <el-col :span="12">电池版本</el-col>
            <el-col :span="12" style="color: #01FFFF">V1.0.5</el-col>
          </el-row>
        </div>
        <div style="padding: 8px;float: left;width: 40%;height:90%;padding-bottom: 8px;border-top: 1px solid #01FFFF">
          <el-row class="elRowBase1" :gutter="10">
            <el-col :span="8">电压</el-col>
            <el-col :span="8">电流</el-col>
            <el-col :span="8">报警</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10">
            <el-col :span="8" style="color: #01FFFF">328</el-col>
            <el-col :span="8" style="color: #01FFFF">330</el-col>
            <el-col :span="8" style="color: #FF0000">10</el-col>
          </el-row>
          <el-row class="elRowBase1" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
            <el-col :span="8">V</el-col>
            <el-col :span="8">A</el-col>
            <el-col :span="8">个</el-col>
          </el-row>
        </div>
      </div>
      <div style="padding: 10px;float: left;width: 96%;height: 15%;">
        <div style="padding: 10px 10px 10px 20px;float: left;width: 97%;">
          <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          </el-row>
        </div>
        <div style="padding: 8px 10px 10px 20px;float: left;width: 97%;">
          <el-row class="elRowBase1" :gutter="10">
            <el-col :span="4" >在线状态</el-col>
            <el-col :span="2" >容量</el-col>
            <el-col :span="4" >备电时长</el-col>
            <el-col :span="3" >SOH</el-col>
            <el-col :span="3" >4G信号</el-col>
            <el-col :span="8" >信号采集时间</el-col>
          </el-row>
          <el-row class="elRowBase2" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
            <el-col :span="4" style="color: #FF0000">在线</el-col>
            <el-col :span="2" >100%</el-col>
            <el-col :span="4" >无</el-col>
            <el-col :span="3">无</el-col>
            <el-col :span="3" >31</el-col>
            <el-col :span="8" >2021-09-30 14:07:32</el-col>
          </el-row>
        </div>
      </div>
      <div style="padding: 10px;float: left;width: 96%;height: 50%;">
        <div style="padding: 10px;float: left;width: 45%;height:95%;margin-right:40px;margin-left:20px">
          <el-card style="border:1px solid #01FFFF;border-radius: 20px;width:100%;background-color: transparent" >
            <div slot="header" style="font-size: 25px;color: white">
              <span class="card-title" style="font-size: 25px;color: white">电池组报警类型分布</span>
            </div>
            <div id="alarmTypeChart" :style="{width: '100%', height: '520px'}"></div>
          </el-card>
        </div>
        <div style="padding: 10px;float: left;width: 45%;height:95%;">
          <el-card style="border:1px solid #01FFFF;border-radius: 20px;width:100%;background-color: transparent" >
            <div slot="header" style="font-size: 25px;color: white">
              <span class="card-title" style="font-size: 25px;color: white">电池组报警等级分布</span>
            </div>
            <div id="alarmLevelChart" :style="{width: '100%', height: '520px'}"></div>
          </el-card>
        </div>
      </div>
    </div>
    <div style="height:98%;width: 55%;float:left;margin-bottom: 20px;">
      <div style="padding: 10px 10px 10px 20px;float: left;width: 96%;">
        <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
          <el-col style="color: white;font-size: 25px;width:100%;">电池单体详细信息</el-col>
        </el-row>
      </div>
      <div style="padding: 8px 10px 10px 40px;float: left;width: 96%;color: white">
        <div v-for="item in Arr" :key="item.id" style="height: 135px;width: 21%;margin:20px;float: left">
          <!--        <p>{{item.id}}</p>-->
          <!--        <img src="../assets/battery/error.png">-->
          <div style="padding: 0px 10px 10px 20px;float: left;">
            <div>
              <img src="../../assets/battery/100%.png">
            </div>
            <div style="font-size: 20px">{{item.id}}</div>
          </div>

          <div style="padding: 0px 10px 10px 0px;float: left;font-size: 20px">
            <div style="margin-bottom: 2px">
              <span>电压</span>
              <span style="margin-left: 20px;">{{ item.current }}V</span>
            </div>
            <div style="margin-bottom: 2px">
              <span>内阻</span>
              <span style="margin-left: 20px;">{{ item.internalResistance }}μΩ</span>
            </div>
            <div style="margin-bottom: 2px">
              <span>温度</span>
              <span style="margin-left: 20px;">{{ item.temperature }}℃</span>
            </div>
            <div style="margin-bottom: 2px">
              <span>报警类型</span>
              <span style="margin-left: 20px;">{{ item.alarmType }}</span>
            </div>
            <div style="margin-bottom: 2px">
              <span>报警等级</span>
              <span style="margin-left: 20px">{{ item.alarmType }}</span>
            </div>
          </div>
        </div>
<!--        <div style="padding: 0px 10px 10px 20px;float: left;">-->
<!--          <div>-->
<!--            <img src="../../assets/battery/100%.png">-->
<!--          </div>-->
<!--          <div style="color: white;font-size: 20px">001</div>-->
<!--        </div>-->

<!--        <div style="padding: 0px 10px 10px 0px;float: left;color: white;font-size: 20px">-->
<!--         <div style="margin-bottom: 2px">-->
<!--           <span>电压</span>-->
<!--           <span style="margin-left: 20px;">0V</span>-->
<!--         </div>-->
<!--          <div style="margin-bottom: 2px">-->
<!--            <span>内阻</span>-->
<!--            <span style="margin-left: 20px;">0μΩ</span>-->
<!--          </div>-->
<!--          <div style="margin-bottom: 2px">-->
<!--            <span>温度</span>-->
<!--            <span style="margin-left: 20px;">26℃</span>-->
<!--          </div>-->
<!--          <div style="margin-bottom: 2px">-->
<!--            <span>报警类型</span>-->
<!--            <span style="margin-left: 20px;">无</span>-->
<!--          </div>-->
<!--          <div style="margin-bottom: 2px">-->
<!--            <span>报警等级</span>-->
<!--            <span style="margin-left: 20px">无</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>

    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'sensorDetails',
  data () {
    return {
      alarmLevelChart: null,
      Arr: [
        { id: '001', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '002', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '003', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '004', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '005', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '006', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '007', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '008', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '009', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '010', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '011', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '012', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '013', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '014', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '015', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '016', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '017', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '018', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '019', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '020', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '021', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '022', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '023', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 },
        { id: '024', voltage: 12, current: 24, internalResistance: 1.3, temperature: 26, alarmType: '无', alarmLeve: 3 }
      ]
    }
  },
  mounted () {
    this.alarmType()
    this.alarmLevel()
  },
  methods: {
    alarmType () {
      let angle = 0// 角度，用来做简单的动画效果的
      const value = 40
      const option = {
        backgroundColor: 'transparent',
        title: {
          text: '{a|' + value + '}{c|%}' + '\n' + '{b|报警类型}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: 48,
                color: '#01FFFF'
              },
              b: {
                fontSize: 28,
                color: '#01FFFF',
                padding: [10, 0]
              },

              c: {
                fontSize: 20,
                color: '#01FFFF'
              }
            }
          }
        },
        color: ['#01FFFF'],
        legend: {
          type: 'plain',
          orient: 'vertical',
          right: 0,
          top: '10%',
          align: 'auto',
          data: [{
            name: '报警分布',
            icon: 'circle'
          }],
          textStyle: {
            color: 'white',
            fontSize: 25,
            padding: [10, 1, 10, 0]
          },
          selectedMode: false
        },
        series: [
          // 外面的线带球球
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65, // 线的位置
                  startAngle: (270 + -angle) * Math.PI / 180,
                  endAngle: (40 + -angle) * Math.PI / 180
                },
                style: {
                  stroke: '#018373',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65, // 线的位置
                  startAngle: (90 + -angle) * Math.PI / 180,
                  endAngle: (220 + -angle) * Math.PI / 180
                },
                style: {
                  stroke: '#018373',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          // 外面的线不带
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                  startAngle: (0 + angle) * Math.PI / 180,
                  endAngle: (90 + angle) * Math.PI / 180
                },
                style: {
                  stroke: '#018373',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          }, {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                  startAngle: (180 + angle) * Math.PI / 180,
                  endAngle: (270 + angle) * Math.PI / 180
                },
                style: {
                  stroke: '#018373',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          // 里面的线
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.43, // 线的位置
                  startAngle: 0, // 开始的地方
                  endAngle: 180// 结束的地方
                },
                style: {
                  stroke: '#018373',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5', // 绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              const r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65
              const point = getCirlPoint(x0, y0, r, (90 + -angle))
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#0CD3DB', // 粉
                  fill: '#0CD3DB'
                },
                silent: true
              }
            },
            data: [0]
          }, {
            name: 'ring5', // 绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              const r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65
              const point = getCirlPoint(x0, y0, r, (270 + -angle))
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#0CD3DB', // 绿
                  fill: '#0CD3DB'
                },
                silent: true
              }
            },
            data: [0]
          },
          // 环形图主体
          {
            name: '报警分布',
            type: 'pie',
            radius: ['58%', '45%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: value,
              name: '',
              itemStyle: {
                normal: {
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#00fff6' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#00b2ff' // 100% 处的颜色
                    }]
                  }
                }
              }
            },
            {
              value: 100 - value,
              name: '',
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#023430'
                }
              }
            }
            ]
          },
          // 小格子
          {
            name: '',
            type: 'gauge',
            radius: '58%',
            center: ['50%', '50%'],
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 128, // 改变小格子宽度
            hoverAnimation: true,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 57,
              lineStyle: {
                width: 5,
                color: '#01423b' // 改变小格子的线颜色
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [{
              value: 0,
              name: ''
            }]
          }

        ]
      }
      // 获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint (x0, y0, r, angle) {
        const x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        const y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
          x: x1,
          y: y1
        }
      }
      function draw () {
        angle = angle + 3
        // this.alarmTypeChart
        const alarmTypeChart = echarts.init(document.getElementById('alarmTypeChart'))
        alarmTypeChart.setOption(option, true)
        // window.requestAnimationFrame(draw);
      }

      setInterval(function () {
        // 用setInterval做动画感觉有问题
        draw()
      }, 100)
    },
    alarmLevel () {
      this.alarmLevelChart = echarts.init(document.getElementById('alarmLevelChart'))
      const option = {
        // 提示框组件，鼠标放在图上的提示信息
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: 'white',
            fontSize: 22
          }
        },
        color: ['#FF0000', '#F89D2E', '#01FFFF'],
        legend: {
          top: '5%',
          left: 'right',
          textStyle: {
            color: 'white',
            fontSize: 25,
            padding: [10, 1, 10, 0]
          }
        },
        series: [
          {
            name: '报警等级',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 5, name: '一级' },
              { value: 15, name: '二级' },
              { value: 32, name: '三级' }
            ]
          }
        ]
      }
      this.alarmLevelChart.setOption(option)
    }
  }
}
</script>

<style scoped>
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
.elRowBase3{
  text-align: center;
  font-size: 35px
}
.elRowBase4{
  text-align: center;
  color: white;
  font-size: 25px;
  height: 35%;
}
.elRowBase5{
  margin-top: 10%;
  text-align: center;
  color: white;
  font-size: 25px;
  height: 30%;
}
</style>
