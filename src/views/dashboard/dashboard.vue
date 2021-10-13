<template>
<!--  <div style="height: 100%;width: 100%">-->
<!--    <div style="height:100%;width: 30%;float:left;">111-->
<!--    </div>-->
<!--    <div style="height:100%;width: 25%;float:right;">222-->
<!--    </div>-->

<!--    <div style="height:100%;width: 70%;float:right;">-->
<!--    </div>-->
<!--    <div id="china_map" style='width:600px;height:400px;'> </div>-->
<!--  </div>-->
<!--  background-color: #0A0D0D-->
  <div style="height: 100%;width: 100%;background-color: #0A0D0D">
    <div style="height:100%;width: 30%;float:left;">
      <div style="height:12%;border:1px solid #01FFFF;border-radius:30px;margin:20px 20px 20px 30px;">
        <div style="padding: 20px">
          <el-row class="elRowBase1" :gutter="10">
            <el-col :span="8">累计监测时间</el-col>
            <el-col :span="8">监测电池数量</el-col>
            <el-col :span="8">故障电池数量</el-col>
          </el-row>
          <el-row class="elRowBase2" :gutter="10">
            <el-col :span="8" style="color: #01FFFF">328</el-col>
            <el-col :span="8" style="color: #01FFFF">330</el-col>
            <el-col :span="8" style="color: #FF0000">10</el-col>
          </el-row>
          <el-row class="elRowBase1" :gutter="10">
            <el-col :span="8">天</el-col>
            <el-col :span="8">个</el-col>
            <el-col :span="8">个</el-col>
          </el-row>
        </div>
      </div>
      <div style="height:30%;border:1px solid #01FFFF;border-radius:30px;margin:60px 20px 20px 30px;">
        <div style="padding: 20px">
          <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
            <el-col style="color: white;font-size: 25px;width:100%;">操作日志</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9" style="color: #01FFFF">类别</el-col>
            <el-col :span="8" style="color: #01FFFF">最近30天</el-col>
            <el-col :span="6" style="color: #01FFFF">变化</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9">巡检次数</el-col>
            <el-col :span="8">32000</el-col>
            <el-col :span="6">-20</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9">故障次数</el-col>
            <el-col :span="8">32000</el-col>
            <el-col :span="6">-20</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9">故障自动修复次数</el-col>
            <el-col :span="8">32000</el-col>
            <el-col :span="6">-20</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9">预警次数</el-col>
            <el-col :span="8">32000</el-col>
            <el-col :span="6">-20</el-col>
          </el-row>
          <el-row class="elRowBase3" :gutter="10" style="padding-bottom: 8px">
            <el-col :span="9">充电次数</el-col>
            <el-col :span="8">32000</el-col>
            <el-col :span="6">-20</el-col>
          </el-row>
        </div>
      </div>
      <div style="height:40%;border:1px solid #01FFFF;border-radius:30px;margin:60px 20px 20px 30px;">
        <div style="padding: 20px">
          <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px;border-bottom: 1px solid #01FFFF">
            <el-col :span="8" style="color: white;font-size: 25px;">报警日志</el-col>
          </el-row>
        </div>
        <div style="height:80%;width:100%;">
          <template>
            <vue-seamless-scroll :data="listData" class="seamless-warp"  :class-option="classOption">
              <ul class="item">
                <li v-for="item in listData" class="Carousel_li" :class="[{'border_1':item.index=='1'},{'border_2':item.index=='2'},{'border_3':item.index=='3'}]" >
                  <span class="pro_1" v-if="item.index=='1'">一级</span>
                  <span class="pro_2" v-if="item.index=='2'">二级</span>
                  <span class="pro_3" v-if="item.index=='3'">三级</span>
                  <span class="date" v-text="item.date"></span>
                  <!--            <span style="padding:0 10px;">:</span>-->
                  <span class="title" v-text="item.title" :class="[{'pro_1':item.index=='1'},{'pro_2':item.index=='2'},{'pro_3':item.index=='3'}]" ></span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </template>
        </div>
      </div>
<!--      <div style="height:25%;border:1px solid #01FFFF;border-radius:30px;margin:60px 20px 20px 30px;">-->
<!--        <div style="padding: 20px">-->
<!--          <el-row class="elRowBase" :gutter="10" style="padding-bottom: 8px">-->
<!--            <el-col :span="8" style="color: white;font-size: 18px">操作日志</el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div style="height:100%;width: 70%;float:left;">
      <el-card style="border:1px solid #01FFFF;border-radius: 20px;height: 93%;margin: 20px;background-color: transparent" >
        <div slot="header" style="font-size: 25px;color: white">
          <!--            <span class="card-title" style="font-size: 25px;color: white">监控地图</span>-->
          <el-row class="elRowBase" :gutter="10">
            <el-col :span="6" style="text-align: left">站点数量:<span>16</span></el-col>
            <el-col :span="6" style="text-align: left">故障数量:<span>16</span></el-col>
            <el-col :span="6" style="text-align: left">电池组数量:<span>16</span></el-col>
            <el-col :span="6" style="text-align: left">在线数量:<span>16</span></el-col>
          </el-row>
        </div>
<!--        <div id="box" v-if="ifbox" style="color: white">-->
<!--          <p>{{TipsList.name}}</p>-->
<!--          <p>{{TipsList.siteNum[2]}}</p>-->
<!--          <p>{{TipsList.onlineNum[2]}}</p>-->
<!--          <p>{{TipsList.batteryNum[2]}}</p>-->
<!--          <p>{{TipsList.faultNum[2]}}</p>-->
<!--        </div>-->

        <div id="box" v-if="ifbox" style="width:280px;height: 150px; background: #026295;box-shadow: 0 0 10px #008b9a; border: 1px solid #008b9a;color: #fff;text-align: center;font-size: 20px">
          <div style="width: 239px; height: 80px; float: left;">
            <div style="width: 238px;height: 30px;border-bottom: 1px solid #008b9a">{{TipsList.name}}</div>
            <div style="width: 119px;height: 60px;float: left;border-bottom: 1px solid #008b9a;margin: 0px">
              <p style="color: #F89D2E;margin: 0px">{{TipsList.siteNum[2]}}</p>
              <p style="margin: 0px">站点数量</p>
            </div>
            <div style="width: 119px;height: 60px;float: left;border-bottom: 1px solid #008b9a;border-bottom: 1px solid #008b9a;margin: 0px">
              <p style="color: #F89D2E;margin: 0px">{{TipsList.batteryNum[2]}}</p>
              <p style="margin: 0px">电池组数量</p>
            </div>
            <div style="width: 119px;height: 60px;float: right;margin: 0px">
              <p style="color: #FF0000;margin: 0px">{{TipsList.faultNum[2]}}</p>
              <p style="margin: 0px">故障数量</p>
            </div>
            <div style="width: 119px;height: 60px;float: right;margin: 0px">
              <p style="color: #F89D2E;margin: 0px">{{TipsList.onlineNum[2]}}</p>
              <p style="margin: 0px">在线数量</p>
            </div>
          </div>
          <div style="width: 39px;height: 150px; border-left: 1px solid #008b9a;float: left;" @click="toClient()">
            <i class="el-icon-arrow-right" style="margin-top: 60px"></i>
          </div>
        </div>

        <div id="myChartChina" style="height:1000px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
require('echarts/map/js/china')
export default {
  name: 'dashboard',
  props: ['List'],
  data () {
    return {
      ifbox: false,
      TipsList: [],
      listData: [{
        index: '2',
        title: '电池温度过高',
        date: '2020-12-16'
      }, {
        index: '1',
        title: '电池电量不足',
        date: '2021-07-16'
      }, {
        index: '3',
        title: '电池温度过低',
        date: '2021-08-12'
      }, {
        index: '1',
        title: '电池电量不足',
        date: '2021-08-26'
      }, {
        index: '3',
        title: '电池电压过高',
        date: '2021-09-16'
      }, {
        index: '1',
        title: '出现故障',
        date: '2017-12-16'
      }]
    }
  },
  mounted () {
    this.ChinaMap()
  },
  computed: {
    classOption () {
      return {
        step: 0.5, // 数值越大速度滚动越快
        // limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  methods: {
    // 点击模拟数据右箭头跳转外页面，
    // toClient (id) {
    //   this.$router.push({
    //     path: '/Client',
    //     query: { lesseeCompanyId: id }
    //   })
    // },
    toClient () {
      this.$router.push({
        path: '/battery/details'
      })
    },
    ChinaMap () {
      var that = this
      // 模拟数据
      const data = [
        // { name: '海门', siteNum: 90, batteryNum: 35, onlineNum: 8, faultNum: 2 },
        // { name: '鄂尔多斯', siteNum: 102, batteryNum: 15, onlineNum: 16, faultNum: 1 },
        // { name: '齐齐哈尔', siteNum: 140, batteryNum: 30, onlineNum: 20, faultNum: 2 },
        // { name: '海门', value: 90, num: 5, id: 8 },
        // { name: '鄂尔多斯', value: 102, num: 15, id: 16 },
        // { name: '齐齐哈尔', value: 140, num: 30, id: 20 }

        { name: '海门', siteNum: 90, batteryNum: 5, onlineNum: 8, faultNum: 2 },
        { name: '鄂尔多斯', siteNum: 102, batteryNum: 150, onlineNum: 16, faultNum: 1 },
        { name: '齐齐哈尔', siteNum: 140, batteryNum: 30, onlineNum: 20, faultNum: 2 },
        { name: '湖南', siteNum: 170, batteryNum: 50, onlineNum: 200, faultNum: 2 }

        // { name: '海门', siteNum: 90, batteryNum: 35, onlineNum: 8 },
        // { name: '鄂尔多斯', siteNum: 102, batteryNum: 15, onlineNum: 16 },
        // { name: '齐齐哈尔', siteNum: 140, batteryNum: 30, onlineNum: 20 }

      ]
      const geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        齐齐哈尔: [123.97, 47.33],
        // 黑龙江: [127.9688, 45.368,1],
        // 内蒙古: [110.3467, 41.4899,1],
        // 吉林: [125.8154, 44.2584,1],
        // 北京: [116.4551, 40.2539,2],
        // 辽宁: [123.1238, 42.1216,1],
        // 河北: [114.4995, 38.1006,1],
        // 天津: [117.4219, 39.4189,1],
        // 山西: [112.3352, 37.9413,1],
        // 陕西: [109.1162, 34.2004,1],
        // 甘肃: [103.5901, 36.3043,1],
        // 宁夏: [106.3586, 38.1775,1],
        // 青海: [101.4038, 36.8207,1],
        // 新疆: [87.9236, 43.5883,1],
        // 西藏: [91.11, 29.97,1],
        // 四川: [103.9526, 30.7617,1],
        // 重庆: [108.384366, 30.439702,1],
        // 山东: [117.1582, 36.8701,1],
        // 河南: [113.4668, 34.6234,1],
        // 江苏: [118.8062, 31.9208,1],
        // 安徽: [117.29, 32.0581,1],
        // 湖北: [114.3896, 30.6628,1],
        // 浙江: [119.5313, 29.8773,1],
        // 福建: [119.4543, 25.9222,1],
        // 江西: [116.0046, 28.6633,1],
        湖南: [113.0823, 28.2568]
        // 贵州: [106.6992, 26.7682,1],
        // 云南: [102.9199, 25.4663,1],
        // 广东: [113.12244, 23.009505,1],
        // 广西: [108.479, 23.1152,1],
        // 海南: [110.3893, 19.8516,1],
        // 上海: [121.4648, 31.2891,1],
        // 台湾: [120.991676054688, 24.7801149726563,1],
        // 澳门: [113.33, 22.11,1],
        // 香港: [114.15, 22.15,1]
      }

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          // 遍历data数据
          // 通过获取name去获取地理位置
          var geoCoord = geoCoordMap[data[i].name]
          // 存放于res：[{"name":"海门","value":[121.15,31.89,90],"num":[121.15,31.89,5],"id":[121.15,31.89,8]},
          // {"name":"鄂尔多斯","value":[109.781327,39.608266,102],"num":[109.781327,39.608266,15],"id":[109.781327,39.608266,16]},
          // {"name":"齐齐哈尔","value":[123.97,47.33,140],"num":[123.97,47.33,30],"id":[123.97,47.33,20]}]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              siteNum: geoCoord.concat(data[i].siteNum),
              batteryNum: geoCoord.concat(data[i].batteryNum),
              onlineNum: geoCoord.concat(data[i].onlineNum),
              faultNum: geoCoord.concat(data[i].faultNum)
            })
            console.log('-------------2-----' + JSON.stringify(res))
          }
        }
        return res
      }

      const myChartChina = echarts.init(document.getElementById('myChartChina')) // 这里是为了获得容器所在位置
      window.onresize = myChartChina.resize
      myChartChina.setOption({ // 进行相关配置
        // backgroundColor: '#1c2431', // 地图背景色
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: { // 字体颜色
                // color: '#797979'
                color: 'white'
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              borderWidth: 1, // 地图边框宽度
              borderColor: '#014888', // 地图边框颜色
              areaColor: '#026295' // 地图颜色
              // areaColor: '#079393'
            },
            emphasis: { // 选中省份的颜色
              // areaColor: '#026295',
              areaColor: '#31FBFB',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              borderWidth: 1,
              shadowColor: '#fff'
            }
          }
        },
        // 滑动显示数据
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          // params.data 就是series配置项中的data数据遍历
          extraCssText: 'width:400px;height:400px',
          formatter: function (params) {
            const tipHtml = `
           <div>
            <p style='font-size:23px;margin-top: 8px;color: #01FFFF'>${params.name}</p>
            <p style='text-align:left;margin-top:8px;font-size: 20px'>站点数量：${params.data.siteNum[2]}</p>
            <p style='text-align:left;margin-top:8px;font-size: 20px'>电池组数量：${params.data.batteryNum[2]}</p>
            <p style='text-align:left;margin-top:8px;font-size: 20px'>在线数量：${params.data.onlineNum[2]}</p>
            <p style='text-align:left;margin-top:8px;font-size: 20px'>故障数量：${params.data.faultNum[2]}</p>
            <p style='text-align:left;margin-top:8px;margin-bottom:4px;font-size: 20px'>故障详情：</p>
            <div>
              <table style="text-align: center;">
                <tr style="font-size: 20px;color: #01FFFF;height: 25px">
                    <th style="width: 160px">机房地址</th>
                    <th style="width: 160px">机房名称</th>
                    <th style="width: 160px">故障描述</th>
                </tr>
                <tr style="font-size: 18px;height: 25px">
                    <td style="width: 160px">湖南大学</td>
                    <td style="width: 160px">实验室517</td>
                    <td style="width: 160px">存在电池异常</td>
                </tr>
                <tr style="font-size: 18px;height: 25px">
                    <td style="width: 160px">湖南大学</td>
                    <td style="width: 160px">实验室518</td>
                    <td style="width: 160px">存在电池异常</td>
                </tr>
                <tr style="font-size: 18px;height: 25px">
                    <td style="width: 160px">湖南大学</td>
                    <td style="width: 160px">实验室519</td>
                    <td style="width: 160px">存在电池异常</td>
                </tr>
                <tr style="font-size: 18px;height: 25px">
                    <td style="width: 160px">湖南大学</td>
                    <td style="width: 160px">实验室520</td>
                    <td style="width: 160px">存在电池异常</td>
                </tr>
                <tr style="font-size: 18px;height: 25px">
                    <td style="width: 160px">湖南大学</td>
                    <td style="width: 160px">实验室521</td>
                    <td style="width: 160px">存在电池异常</td>
                </tr>
            </table>
            </div>
            `
            return tipHtml
            // return params.name + ' 已接入: ' + ' 站点数量: ' + params.data.siteNum[2] + ' 电池组数量: ' + params.data.batteryNum[2] + ' 在线数量: ' + params.data.onlineNum[2] + ' 故障数量: ' + params.data.faultNum[2]
          }
        },
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          // color: '#e1ebe3', // 点的颜色
          color: 'red',
          data: convertData(data),
          symbolSize: 30, // 点的大小
          symbol: 'pin', // 点的样式
          cursor: 'pointer', // 鼠标放上去的效果
          label: {
            normal: { // 默认展示
              show: false
            },
            emphasis: { // 滑过展示
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#5c8f6e',
              borderWidth: 5
            }
          }
        },

        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75,
          tooltip: {
            show: false
          }
        }

        ]
      })
      // if (myChartChina && typeof myChartChina === "object") {
      //     myChartChina.setOption(myChartChina, true);
      // }
      myChartChina.on('click', function (params) { // 点击事件
        if (params.componentType === 'series') {
          if (params.data) {
            that.TipsList = params.data
            console.log('---------进入-------' + JSON.stringify(params.data))
            that.ifbox = true
            // that.boxPosition()
          } else {
            that.ifbox = false
          }
        }
      })
    }
    // 点击地点显示对应位置数据
    // boxPosition () {
    //   var e = event || window.event
    //   var x = e.clientX + 145 + 'px'
    //   var y = e.clientY + 5 + 'px'
    //   clearTimeout(t)
    //   var t = setTimeout(function () {
    //     $('#box').css('top', y),
    //     $('#box').css('left', x)
    //   }, 100)
    //   t
    // }
  }
}
</script>

<style scoped>
body, html{
  width: 100%;
  height: 100%;
}
.elRowBase1{
  text-align: center;
  color: white;
  font-size: 25px;
}
.elRowBase2{
  text-align: center;
  font-size: 35px
}
.elRowBase3{
  text-align: center;
  color: white;
  font-size: 23px;
  padding-top: 10px;
}
.seamless-warp {
  width:100%;
  height: 100%;
  overflow: hidden;
}
.Carousel_li{
  display: flex;
  padding-right:.5%;
  width: 93%;
  height:2.447916666666667vw;
  line-height:2.447916666666667vw;
  background-size: 100%!important;
  color:#BDF3F6;
  /*color: white;*/
  /*border-bottom:1px solid #01FFFF;*/
  margin-bottom:0.5208333333333334vw;
  font-size: 25px;
.title{
  padding: 0 1% 0 4%;
  width: 21%;

}
.ovr_h{
  width: 51%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
}
.date{
  padding-right: 30px;
}
/*未开始*/
.pro_1{
  /*//background: url("../../assets/image/other/未开始.png") no-repeat center;*/
  color:#FF0000;
  padding-right: 30px;
  padding-left: 20px;
}
/*进行中*/
.pro_2{
  /*//background: url("../../assets/image/other/进行中.png") no-repeat center;*/
  /*#00FCD8*/
  color:#F89D2E;
  padding-right: 30px;
  padding-left: 20px;
}
/*已完成*/
.pro_3{
  /*//background: url("../../assets/image/other/已完成.png") no-repeat center;*/
  color:#01FFFF;
  padding-right: 30px;
  padding-left: 20px;
}
.border_1{
  border-left: 5px solid #FF0000;
  border-right: 5px solid #FF0000;
  /*border-bottom: 1px solid #FF0000;*/
}
.border_2{
  border-left: 5px solid #F89D2E;
  border-right: 5px solid #F89D2E;
  /*border-bottom: 1px solid #F89D2E;*/
}
.border_3{
  border-left: 5px solid #01FFFF;
  border-right: 5px solid #01FFFF;
  /*border-bottom: 1px solid #01FFFF;*/
}
</style>
