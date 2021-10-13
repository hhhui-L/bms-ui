<template>
    <div style="height: 100%;width: 100%">
      <div style="height:100%;width: 55%;float:left">
        <div style="padding: 8px">
          <el-card style="border-radius: 10px">
            <div slot="header">
              <span class="card-title">工艺号设置</span>
            </div>
            <el-row class="elRowBase" :gutter="10">
              <el-col :span="4" style="text-align: left">请选择工艺号: </el-col>
              <el-col :span="18">
                <el-select v-model="value" placeholder="工艺号" @change="set"
                           style="width: 160px;margin-right: 10px;border-color: #67ACE4">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="elRowBase" style="margin-top: 30px" :gutter="10">
              <el-col :span="3" style="text-align: left">当前阶段: </el-col>
              <el-col :span="3.5" ><el-button type="primary" round @click="previousStage">上一阶段</el-button></el-col>
              <el-col :span="3.5"><el-col :span="4" class="pattern">{{ currentStage }}</el-col></el-col>
              <el-col :span="4" ><el-button type="primary" round @click="nextStage">下一阶段</el-button></el-col>
              <el-col :span="3" style="text-align: left">当前方式: </el-col>
              <el-col :span="3.5" ><el-button type="primary" round @click="previousPattern">上一方式</el-button></el-col>
              <el-col :span="3.5"><el-col :span="4" class="pattern">{{ currentPattern }}</el-col></el-col>
              <el-col :span="3" ><el-button type="primary" round @click="nextPattern">下一方式</el-button></el-col>
              <!--<el-col :span="4" style="text-align: left">当前阶段: </el-col>
              <el-col :span="4">
                <el-input-number
                  v-model="currentStage"
                  controls-position="right"
                  :min="1"
                  :max="30"
                  :step="1"
                />
              </el-col>-->
            </el-row>

            <el-row class="elRowBase" style="margin-top: 30px" :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="17">
                    <div>
                      <el-card  class="para-card" >
                        <div slot="header">
                          <span class="small-title">控制条件</span>
                        </div>
                        <el-row class="elRowBase" style="margin-top: 20px" :gutter="10">
                          <el-col :span="8" style="text-align: left" class="text">电流(A)： </el-col>
                          <el-col :span="10">
                            <el-input
                              :disabled="notCtnCurrent"
                              v-model="ctnCurrent"
                              placeholder="请输入控制电流"
                              style="width: 240px"
                            />
                          </el-col>
                        </el-row>
                        <el-row class="elRowBase" :gutter="10">
                          <el-col :span="8" style="text-align: left" class="text">电压(V)： </el-col>
                          <el-col :span="10">
                            <el-input
                              :disabled="notCtnVoltage"
                              v-model="ctnVoltage"
                              placeholder="请输入控制电压"
                              style="width: 240px"
                            />
                          </el-col>
                        </el-row>
                      </el-card>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="17">
                    <div>
                      <el-card class="para-card">
                        <div slot="header">
                          <span class="small-title">转换条件</span>
                        </div>
                        <el-row class="elRowBase" :gutter="10">
                          <el-col :span="8" style="text-align: left" class="text">电流(A)： </el-col>
                          <el-col :span="10">
                            <el-input
                              :disabled="notExcCurrent"
                              v-model="excCurrent"
                              placeholder="请输入转换电流"
                              style="width: 240px"
                            />
                          </el-col>
                        </el-row>
                        <el-row class="elRowBase" :gutter="10">
                        <el-col :span="8" style="text-align: left" class="text">电压(V)： </el-col>
                        <el-col :span="10">
                          <el-input
                            :disabled="notExcVoltage"
                            v-model="excVoltage"
                            placeholder="请输入转换电压"
                            style="width: 240px"
                          />
                        </el-col>
                      </el-row>
                        <el-row class="elRowBase" :gutter="10">
                          <el-col :span="8" style="text-align: left" class="text">电量(Ah)： </el-col>
                          <el-col :span="10">
                            <el-input
                              :disabled="notExcSoc"
                              v-model="excSoc"
                              placeholder="请输入转换电量"
                              style="width: 240px"
                            />
                          </el-col>
                        </el-row>
                      </el-card>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <el-row>
                  <el-col :span="4" >
                    <el-button type="warning" round class="btnControl" @click="saveCurrent">保存当前</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" >
                    <el-button type="success" round class="btnControl" @click="save">  保存  </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script>
import { sendWebsocket, closeWebsocket, websocketSend } from '../../network/websocket'
export default {
  name: 'setting',
  data () {
    return {
      // 工艺号
      options: [{
        value: '1',
        label: '工艺号1'
      }, {
        value: '2',
        label: '工艺号2'
      }, {
        value: '3',
        label: '工艺号3'
      }, {
        value: '4',
        label: '工艺号4'
      }],
      value: '',
      currentStage: '', // 当前阶段
      currentPattern: '', // 当前方式
      ctnCurrent: '', // 控制电流
      ctnVoltage: '', // 控制电压
      excCurrent: '', // 转换电流
      excVoltage: '', // 转换电压
      excSoc: '', // 转换电量
      notCtnCurrent: false, // 不能编辑控制电流
      notCtnVoltage: false, // 不能编辑控制电压
      notExcCurrent: false, // 不能编辑转换电流
      notExcVoltage: false, // 不能编辑转换电压
      notExcSoc: false // 不能编辑转换电量
    }
  },
  mounted () {
    this.requestWs()
    this.wsMessage()
  },
  methods: {
    // ws连接成功，后台返回的ws数据，组件要拿数据渲染页面等操作
    wsMessage (data) {
      // 拿到数据后的业务代码
      const result = JSON.parse(data)
      console.log(result)
      if (result.type === 'set') {
        if (result.status === 'success') {
          setTimeout(() => {
            const obj = {
              operation: 'getStage',
              data: '0',
              ConCurrent: '0',
              ConVoltage: '0',
              ChVoltage: '0',
              ChAh: '0',
              ChCurrent: '0'
            }
            websocketSend(obj)
          }, 500)
          setTimeout(() => {
            const obj1 = {
              operation: 'getPattern',
              data: '0',
              ConCurrent: '0',
              ConVoltage: '0',
              ChVoltage: '0',
              ChAh: '0',
              ChCurrent: '0'
            }
            websocketSend(obj1)
          }, 1000)
        }
      } else if (result.type === 'getStage') {
        if (result.status === 'success') {
          this.currentStage = result.resultSetStage
        }
      } else if (result.type === 'getPattern') {
        if (result.status === 'success') {
          if (result.resultSetPattern === '2') {
            this.currentPattern = '充电'
            this.notCtnCurrent = false
            this.notCtnVoltage = false
            this.notExcCurrent = false
            this.notExcVoltage = false
            this.notExcSoc = false
            this.ctnCurrent = null
            this.ctnVoltage = null
            this.excCurrent = null
            this.excVoltage = null
            this.excSoc = null
          } else if (result.resultSetPattern === '1') {
            this.currentPattern = '静置'
          } else if (result.resultSetPattern === '5') {
            this.currentPattern = '电量设置'
          } else if (result.resultSetPattern === '6') {
            this.currentPattern = '循环起点'
          } else if (result.resultSetPattern === '7') {
            this.currentPattern = '循环次数'
          } else if (result.resultSetPattern === '8') {
            this.currentPattern = '结束'
          } else if (result.resultSetPattern === '4') {
            this.currentPattern = '放电'
            this.notCtnCurrent = false
            this.notCtnVoltage = true
            this.notExcCurrent = true
            this.notExcVoltage = false
            this.notExcSoc = false
            this.ctnCurrent = null
            this.ctnVoltage = null
            this.excCurrent = null
            this.excVoltage = null
            this.excSoc = null
          }
        }
      } else if (result.type === 'PreviousStage' || result.type === 'NextStage') {
        if (result.status === 'success') {
          setTimeout(() => {
            const obj = {
              operation: 'getStage',
              data: '0',
              ConCurrent: '0',
              ConVoltage: '0',
              ChVoltage: '0',
              ChAh: '0',
              ChCurrent: '0'
            }
            websocketSend(obj)
          }, 500)
          setTimeout(() => {
            const obj1 = {
              operation: 'getPattern',
              data: '0',
              ConCurrent: '0',
              ConVoltage: '0',
              ChVoltage: '0',
              ChAh: '0',
              ChCurrent: '0'
            }
            websocketSend(obj1)
          }, 1000)
          this.ctnCurrent = null
          this.ctnVoltage = null
          this.excCurrent = null
          this.excVoltage = null
          this.excSoc = null
        }
      } else if (result.type === 'PreviousPattern' || result.type === 'NextPattern') {
        if (result.status === 'success') {
          const obj = {
            operation: 'getPattern',
            data: '0',
            ConCurrent: '0',
            ConVoltage: '0',
            ChVoltage: '0',
            ChAh: '0',
            ChCurrent: '0'
          }
          websocketSend(obj)
          this.ctnCurrent = null
          this.ctnVoltage = null
          this.excCurrent = null
          this.excVoltage = null
          this.excSoc = null
        }
      } else if (result.type === 'savePatternF' || result.type === 'savePatternC' || result.type === 'saveNum') {
        console.log(result.status)
      }
    },
    // ws连接失败，组件要执行的代码
    wsError () {
      // 比如取消页面的loading
    },
    requestWs () {
      // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket()
      // 跟后端协商，需要什么参数数据给后台
      /* const obj = {
        monitorUrl: 'xxxxxxxxxxxxx',
        userName: 'xxxxxxxxxx'
      } */
      // 发起ws请求
      // sendWebsocket('ws://192.168.1.103:5000/userlink/nn', null, this.wsMessage, this.wsError)
      sendWebsocket('ws://47.97.21.239:5000/userlink/nn', null, this.wsMessage, this.wsError)
    },
    set () {
      const obj = {
        operation: 'set',
        data: this.value,
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    },
    previousStage () {
      const obj = {
        operation: 'PreviousStage',
        data: '0',
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    },
    nextStage () {
      const obj = {
        operation: 'NextStage',
        data: '0',
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    },
    previousPattern () {
      const obj = {
        operation: 'PreviousPattern',
        data: '0',
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    },
    nextPattern () {
      const obj = {
        operation: 'NextPattern',
        data: '0',
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    },
    saveCurrent () {
      if (this.currentPattern === '放电') {
        const obj = {
          operation: 'savePatternF',
          data: '0',
          ConCurrent: this.ctnCurrent * 10,
          ConVoltage: '0',
          ChCurrent: '0',
          ChVoltage: this.excVoltage * 10,
          ChAh: this.excSoc * 10
        }
        websocketSend(obj)
      } else if (this.currentPattern === '充电') {
        const obj = {
          operation: 'savePatternC',
          data: '0',
          ConCurrent: this.ctnCurrent * 10,
          ConVoltage: this.ctnVoltage * 10,
          ChCurrent: this.excCurrent * 10,
          ChVoltage: this.excVoltage * 10,
          ChAh: this.excSoc * 10
        }
        websocketSend(obj)
      }
    },
    save () {
      const obj = {
        operation: 'saveNum',
        data: '0',
        ConCurrent: '0',
        ConVoltage: '0',
        ChVoltage: '0',
        ChAh: '0',
        ChCurrent: '0'
      }
      websocketSend(obj)
    }
  }
}
</script>

<style scoped>
  .elRowBase {
    margin-bottom: 10px;
  }
  .btnControl{
    margin-top: 50px;
    width: 130px;
  }
  .card-title{
    font-size:25px;
    font-family: 微软雅黑;
    font-weight: bold;
  }
  .small-title{
    font-size:24px;
    font-family: 微软雅黑;
    font-weight: bold;
  }
  .para-card{
    border-radius: 10px;
    height: 250px;
    width: 410px;
  }
  .pattern{
    border: 1px solid lightskyblue;
    border-radius: 5px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    height: 45px;
    width:80px;
    text-align: center;
  }
  .text{
    font-size: 22px;
    font-family: 微软雅黑;
    font-weight: bold;
    text-align: center;
  }
</style>
