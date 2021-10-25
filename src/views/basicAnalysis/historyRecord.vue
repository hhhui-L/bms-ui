<template>
  <div style="padding: 10px">
<!--    <el-row :gutter="10" style="margin-bottom: 10px">-->
<!--      <el-col :span="2">-->
<!--        <el-input-->
<!--          v-model="findDevtype.corpname"-->
<!--          placeholder="请输入公司名称"-->
<!--        />-->
<!--      </el-col>-->
<!--      <el-col :span="2">-->
<!--        <el-input-->
<!--          v-model="findDevtype.typename"-->
<!--          placeholder="请输入设备类型"-->
<!--        />-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>-->
<!--        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>-->
<!--        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-row :gutter="10" style="margin-bottom: 10px">
<!--      <el-col :span="2">-->
<!--        <el-input-->
<!--          v-model="findDevtype.corpname"-->
<!--          placeholder="请输入公司名称"-->
<!--        />-->
<!--      </el-col>-->
<!--      <el-col :span="2">-->
<!--        <el-input-->
<!--          v-model="findDevtype.corpname"-->
<!--          placeholder="请输入线路名称"-->
<!--        />-->
<!--      </el-col>-->
      <el-col :span="2">
        <el-select v-model="queryInfo.cid" placeholder="请选择报警类型">
          <el-option
            v-for="item in batteryId"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="queryInfo.time"
          placeholder="请输入公司名称"
        />
<!--      <el-date-picker-->
<!--        v-model="queryInfo.time"-->
<!--        type="datetime"-->
<!--        placeholder="选择日期时间"-->
<!--        default-time="12:00:00"-->
<!--        value-format="yyyy-MM-dd"-->
<!--      >-->
<!--      </el-date-picker>-->
      </el-col>
<!--      <el-col :span="2">-->
<!--        <el-select placeholder="状态">-->
<!--          <el-option-->
<!--            v-for="item in status"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-col>-->

<!--      <el-col :span="4">-->
<!--        <el-date-picker-->
<!--          v-model="timeRange"-->
<!--          type="datetimerange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--        />-->
<!--      </el-col>-->
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
<!--        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>-->
<!--        <el-button type="primary" icon="el-icon-s-order" @click="exportExcel">导出</el-button>-->
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-bottom: 10px">
    </el-row>

    <el-table
      :data="recordListTable"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
    >
      <el-table-column
        type="index"
        label="序号"
        prop="order"
        width="55"
        :index="dataIndex"
        align="center">
      </el-table-column>
      <el-table-column label="id" v-if="false" min-width="150px" prop="id" align="center"></el-table-column>
<!--      <el-table-column label="公司名称" min-width="150px" prop="corp_name" align="center"></el-table-column>-->
<!--      <el-table-column label="类型名称" min-width="150px" prop="type_name" align="center"></el-table-column>-->
<!--      <el-table-column label="采集时间" min-width="150px" prop="name"></el-table-column>-->
      <el-table-column label="电池编号" min-width="200px" prop="clientid" align="center"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="ts" align="center"></el-table-column>
      <!--      <el-table-column label="型号" min-width="150px" prop="batType"></el-table-column>-->
      <el-table-column label="总电压(V)" min-width="200px" prop="Vol" align="center"></el-table-column>
<!--      <el-table-column label="总电流(A)" min-width="200px" prop="voltageL"></el-table-column>-->
<!--      <el-table-column label="状态" min-width="200px" prop="voltageL"></el-table-column>-->
<!--      <el-table-column label="容量(%)" min-width="200px" prop="current"></el-table-column>-->
<!--      <el-table-column label="电池电压(V)" min-width="200px" prop="current"></el-table-column>-->
      <el-table-column label="内阻(μΩ)" min-width="200px" prop="Res" align="center"></el-table-column>
      <el-table-column label="温度(℃)" min-width="200px" prop="Temp" align="center"></el-table-column>
<!--      <el-table-column label="能耗(WH)" min-width="200px" prop="current"></el-table-column>-->
    </el-table>

<!--    <el-pagination-->
<!--      :page-sizes="pageSizeList"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="totalCount"-->
<!--      align="right"-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--    />-->

  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'type',
  data () {
    return {
      recordListTable: [],
      queryInfo: {
        cid: 'sensor001',
        time: '20211021'
      },
      totalCount: 400, // 总条目数
      pageSizeList: [10, 20, 50, 100], // 选择每页显示个数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条目数
      dataIndex: 1,

      laboratory: [{
        value: '1',
        label: '湖南大学实验室'
      }],
      deviceType: [{
        value: '1',
        label: '电池_实验室'
      }, {
        value: '2',
        label: '电池组_实验室'
      }],
      status: [{
        value: 'charge',
        label: '充电'
      }, {
        value: 'discharge',
        label: '放电'
      }, {
        value: 'standing',
        label: '浮充'
      }],
      batteryId: [{
        value: 'sensor001',
        label: '电池001'
      }, {
        value: 'sensor002',
        label: '电池002'
      }, {
        value: 'sensor003',
        label: '电池003'
      }, {
        value: 'sensor004',
        label: '电池004'
      }, {
        value: 'sensor005',
        label: '电池005'
      }, {
        value: 'sensor006',
        label: '电池006'
      }, {
        value: 'sensor007',
        label: '电池007'
      }, {
        value: 'sensor008',
        label: '电池008'
      }, {
        value: 'sensor009',
        label: '电池009'
      }, {
        value: 'sensor010',
        label: '电池010'
      }, {
        value: 'sensor011',
        label: '电池011'
      }, {
        value: 'sensor012',
        label: '电池012'
      }, {
        value: 'sensor013',
        label: '电池013'
      }, {
        value: 'sensor014',
        label: '电池014'
      }, {
        value: 'sensor015',
        label: '电池015'
      }, {
        value: 'sensor016',
        label: '电池016'
      }, {
        value: 'sensor017',
        label: '电池017'
      }, {
        value: 'sensor018',
        label: '电池018'
      }, {
        value: 'sensor019',
        label: '电池019'
      }, {
        value: 'sensor020',
        label: '电池020'
      }, {
        value: 'sensor021',
        label: '电池021'
      }, {
        value: 'sensor022',
        label: '电池022'
      }, {
        value: 'sensor023',
        label: '电池023'
      }, {
        value: 'sensor024',
        label: '电池024'
      }],
      timeRange: null
    }
  },
  mounted () {
    this.getRecord()
  },
  methods: {
    getRecord () {
      const baseUrl = 'http://192.168.0.110:5000/findbycidandtime'
      axios({
        url: baseUrl,
        method: 'get',
        params: {
          cid: this.queryInfo.cid,
          time: this.queryInfo.time
        }
      }).then((res) => {
        console.log('------cid-----' + this.queryInfo.cid)
        console.log('------time-----' + this.queryInfo.time)
        console.log(JSON.stringify(res.data.data))
        this.recordListTable = res.data.data
      })
    },
    conditionQuery () {
      this.getRecord()
    },
    clearCondition () {
      this.findDevtype.corpname = ''
      this.findDevtype.typename = ''
    },
    exportExcel () {
      // this.htmlToExcels.exportExcel('控制器管理.xlsx', '#devctrlManage')
      const excelData = this.devctrlTable // 将你要导出的数组数据（historyList）赋值给excelDate
      console.log('--excelData---' + JSON.stringify(this.excelData))
      const tHeader = ['公司名称', '设备类型', '调试状态', '设备编号', '控制器编号', '创建时间', '设备id', '对应电池编号', '设备SN码', '设备token'] // 导出的excel表头名信息
      const filterVal = [
        'corp_name',
        'dev_type',
        'dev_debug',
        'dev_num',
        'ctrl_num',
        'create_time',
        'dev_id',
        'bat_model',
        'dev_sn'
      ] // 导出的excel表头字段名，需要导出表格字段名
      const title = '设备历史数据'
      this.htmlToExcels.export2Excel(excelData, tHeader, filterVal, title) // 调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    }
  }
}
</script>

<style scoped>

</style>
