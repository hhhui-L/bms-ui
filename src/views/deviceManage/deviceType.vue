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
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="conditionQuery">添加</el-button>
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
      <el-table-column
        type="index"
        label="序号"
        prop="order"
        width="55"
        :index="dataIndex">
      </el-table-column>
      <el-table-column label="公司名称" min-width="150px" prop="name"></el-table-column>
      <el-table-column label="类型名称" min-width="150px" prop="date"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="voltageH"></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
  name: 'type',
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
        deviceType: null,
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
      deviceType: [{
        value: '1',
        label: '电池_实验室'
      }, {
        value: '2',
        label: '电池组_实验室'
      }],
      timeRange: null
    }
  }
}
</script>

<style scoped>

</style>
