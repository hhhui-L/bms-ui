<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-select v-model="queryExpHisBean.laboratory" placeholder="请选择业主">
          <el-option
            v-for="item in laboratory"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="queryExpHisBean.line" placeholder="请选择线路">
          <el-option
            v-for="item in line"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
<!--      <el-col :span="2">-->
<!--        <el-select v-model="queryExpHisBean.line" placeholder="请选择">-->
<!--          <el-option-->
<!--          &lt;!&ndash;            v-for="item in line"&ndash;&gt;-->
<!--          &lt;!&ndash;            :key="item.value"&ndash;&gt;-->
<!--          &lt;!&ndash;            :label="item.label"&ndash;&gt;-->
<!--          &lt;!&ndash;            :value="item.value"&ndash;&gt;-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-col>-->
      <el-col :span="2">
        <el-select v-model="queryExpHisBean.experiment_type" placeholder="请选择报警类型">
          <el-option
            v-for="item in alarmType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-s-order" @click="clearCondition">导出</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="showTable"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="公司名称" min-width="150px" prop="batType"></el-table-column>
      <el-table-column label="报警类型" min-width="150px" prop="batType"></el-table-column>
      <el-table-column label="等级" min-width="150px" prop="batType"></el-table-column>
      <el-table-column label="报警时间" min-width="150px" prop="voltageL"></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">下发通知</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="pageSizeList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      align="right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'siteAlarm',
  data () {
    return {
      devInfo: null,
      prjInfo: null,
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100],
      totalCount: 400,
      currentPageCount: 0,
      dataIndex: 1,
      queryExpHisBean: {
        laboratory: null,
        line: null,
        alarmType: null,
        start_time_start: null,
        start_time_end: null,
        offset: 0,
        limit: 1000
      },
      laboratory: [{
        value: '1',
        label: '湖南大学实验室'
      }],
      line: [{
        value: '1',
        label: '实验室'
      }],
      alarmType: [{
        value: '0',
        label: '环境温度超温报警'
      }, {
        value: '1',
        label: '整组低压'
      }, {
        value: '2',
        label: '预维护报警'
      }, {
        value: '3',
        label: '传感器故障'
      }, {
        value: '4',
        label: '内阻报警'
      }, {
        value: '5',
        label: '整组过压'
      }, {
        value: '6',
        label: 'SOC过低'
      }, {
        value: '7',
        label: '应急放电过流'
      }, {
        value: '8',
        label: '单体电压过高'
      }, {
        value: '9',
        label: '充电过流'
      }, {
        value: '10',
        label: '电容量过低'
      }],
      timeRange: null
    }
  }
}
</script>

<style scoped>

</style>
