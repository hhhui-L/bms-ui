<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="3">
        <el-select v-model="queryExpHisBean.laboratory" placeholder="请选择业主">
          <el-option
            v-for="item in laboratory"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="queryExpHisBean.deviceType" placeholder="请选择设备类型">
          <el-option
            v-for="item in deviceType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="queryExpHisBean.battery_model"
          placeholder="请输入控制器名称"
        />
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="conditionQuery">添加</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="16">
        <el-button type="primary" icon="el-icon-upload" @click="conditionQuery">导入表格</el-button>
        <el-button type="primary" icon="el-icon-download" @click="conditionQuery">模板下载</el-button>
        <el-button type="primary" icon="el-icon-s-order" @click="clearCondition">导出</el-button>
        <el-button type="danger">批量删除</el-button>
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        prop="order"
        width="55"
        :index="dataIndex">
      </el-table-column>
      <el-table-column label="公司名称" min-width="150px" prop="name"></el-table-column>
      <el-table-column label="设备类型" min-width="150px" prop="date"></el-table-column>
      <el-table-column label="调试状态" min-width="150px" prop="batType"></el-table-column>
      <el-table-column label="设备编号" min-width="200px" prop="expType"></el-table-column>
      <el-table-column label="控制器编号" min-width="200px" prop="voltageH"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="voltageL"></el-table-column>
      <el-table-column label="设备ID" min-width="200px" prop="current"></el-table-column>
      <el-table-column label="对应电池编号" min-width="200px" prop="current"></el-table-column>
      <el-table-column label="设备SN码" min-width="200px" prop="current"></el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizeList"
      :page-size="pageSize"
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
  name: 'deviceRecord',
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
        status: null,
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
      timeRange: null
    }
  }
}
</script>

<style scoped>

</style>
