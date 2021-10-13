<template>
  <div style="height: 100%;width: 100%">
    <!-- 描述：选择条件，清空和搜索按钮-->
    <div class="filter-container">
      <div class="letf-items" style="float: left;margin-bottom: 10px;margin-top: 10px">
        <el-input placeholder="实验名称"
                  style="width: 200px;margin-right: 10px;margin-left: 10px"
                  class="filter-item"
                  v-model="keyWords.experiment_name"/>
        <el-input placeholder="电池型号"
                  style="width: 200px;margin-right: 10px"
                  class="filter-item"
                  v-model="keyWords.battery_type"/>
        <el-select v-model="keyWords.experiment_type" placeholder="实验类型"
                   style="width: 120px;margin-right: 10px" class="filter-item">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="right-items" style="float: right;margin-bottom: 10px;margin-top: 10px">
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="el-icon-delete"
                   @click="handleClear">清空</el-button>
        <el-button
          type="danger" style="margin-right: 10px">批量删除</el-button>
      </div>
    </div>
      <!-- 实验列表区域 -->
      <el-table
        :data="showTable"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%;"
        height="700"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          prop="order"
          width="55"
          :index="dataIndex">
        </el-table-column>
        <el-table-column label="实验名称" min-width="150px" prop="name"></el-table-column>
        <el-table-column label="实验时间" min-width="150px" prop="date"></el-table-column>
        <el-table-column label="电池型号" min-width="150px" prop="batType"></el-table-column>
        <el-table-column label="实验类型" min-width="150px" prop="expType"></el-table-column>
        <el-table-column label="上限电压(V)" min-width="120px" prop="voltageH"></el-table-column>
        <el-table-column label="下限电压(V)" min-width="120px" prop="voltageL"></el-table-column>
        <el-table-column label="截止电流(A)" min-width="120px" prop="current"></el-table-column>
        <el-table-column label="实验状态" min-width="120px" prop="state"></el-table-column>
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

      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-sizes="pageSizeList"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataQuery',
  data () {
    return {
      // 搜索的关键字
      // keyWords: '',
      // 每页数据条数
      page_size: 10,
      // 当前页码
      current_page: 1,
      pageSizeList: [10, 20, 30, 50],
      totalCount: 300,
      showTable: [],
      filterTableDataEnd: [],
      flag: false,
      // 列表数据
      tableData: [
        {
          name: 'test1',
          date: '2021-03-20',
          batType: '松下',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test2',
          date: '2021-03-21',
          batType: '理士',
          expType: '放电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test3',
          date: '2021-03-21',
          batType: '松下',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test4',
          date: '2021-03-24',
          batType: '双登',
          expType: '静置',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test1',
          date: '2021-03-20',
          batType: '理士',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test2',
          date: '2021-03-21',
          batType: '双登',
          expType: '放电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test3',
          date: '2021-03-21',
          batType: '双登',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test4',
          date: '2021-03-24',
          batType: '理士',
          expType: '静置',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test1',
          date: '2021-03-20',
          batType: '松下',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test2',
          date: '2021-03-21',
          batType: '双登',
          expType: '放电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test3',
          date: '2021-03-21',
          batType: '理士',
          expType: '充电',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        },
        {
          name: 'test4',
          date: '2021-03-24',
          batType: '松下',
          expType: '静置',
          voltageH: '0',
          voltageL: '0',
          current: '0',
          state: 'end'
        }
      ],
      keyWords: {
        experiment_name: null,
        experiment_type: null,
        battery_type: null
      },
      queryExpData: {
        experiment_name: null,
        experiment_type: null,
        battery_type: null,
        time_start: null,
        time_end: null,
        offset: 0,
        limit: 1000
      },
      options: [{
        value: 'charge',
        label: '充电'
      }, {
        value: 'discharge',
        label: '放电'
      }, {
        value: 'standing',
        label: '静置'
      }],
      value: ''
    }
  },
  created () {
    this.totalCount = this.tableData.length
    if (this.totalCount > this.page_size) {
      for (let index = 0; index < this.page_size; index++) {
        this.showTable.push(this.tableData[index])
      }
    } else {
      this.showTable = this.tableData
    }
  },
  methods: {
    handleClear () {
      this.keyWords.experiment_name = null
      this.keyWords.battery_type = null
      this.keyWords.experiment_type = null
    },
    handleCheck () {
      this.$router.push('/expdata/datarecord')
    },
    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    handleSearch () {
      if (this.keyWords.experiment_name && this.keyWords.battery_type && this.keyWords.experiment_type === ' ') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.showTable = []
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableData.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.keyWords.experiment_name) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.current_page = 1
      this.totalCount = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      // 页面初始化数据需要判断是否检索过
      this.flag = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page_size = val
      this.handleCurrentChange(this.current_page)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.current_page = val
      // 需要判断是否检索
      if (!this.flag) {
        // tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
        this.currentChangePage(this.tableData)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, // 组件自带监控当前页码
    currentChangePage (list) {
      let from = (this.current_page - 1) * this.page_size
      const to = this.current_page * this.page_size
      this.showTable = []
      for (; from < to; from++) {
        if (list[from]) {
          this.showTable.push(list[from])
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
