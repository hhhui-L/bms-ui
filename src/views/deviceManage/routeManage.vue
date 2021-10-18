<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findRoute.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findRoute.routename"
          placeholder="请输入线路名称"
        />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
        <el-button type="primary" icon="el-icon-s-order" @click="exportExcel">导出</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="routeTable"
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
      <el-table-column label="公司名称" min-width="150px" prop="corp_name" align="center"></el-table-column>
      <el-table-column label="线路名称" min-width="150px" prop="route_name" align="center"></el-table-column>
      <el-table-column label="线路标识" min-width="200px" prop="route_mark" align="center"></el-table-column>
      <el-table-column label="排序id" min-width="200px" prop="sort_id" align="center"></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
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

    <el-dialog title="添加线路" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="routeFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input v-model="routeFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="线路名称" prop="routeName" :label-width="formLabelWidth">
          <el-input v-model="routeFormAdd.routeName"></el-input>
        </el-form-item>
        <el-form-item label="线路标识" prop="routeMark" :label-width="formLabelWidth">
          <el-input v-model="routeFormAdd.routeMark"></el-input>
        </el-form-item>
        <el-form-item label="排序id" prop="sortId" :label-width="formLabelWidth">
          <el-input v-model="routeFormAdd.sortId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitRouteAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改线路" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="routeFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="routeFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="线路名称" prop="route_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="routeFormEdit.route_name"></el-input>
        </el-form-item>
        <el-form-item label="线路标识" prop="route_mark" :label-width="formLabelWidth">
          <el-input type="text" v-model="routeFormEdit.route_mark"></el-input>
        </el-form-item>
        <el-form-item label="排序id" prop="sort_id" :label-width="formLabelWidth">
          <el-input type="text" v-model="routeFormEdit.sort_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="updateRoute('ruleFormEdit')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDelete"
      width="30%"
    >
      <span style="font-size: 20px">确定要进行删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="danger" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { addRoute, deleteRoute, getRoute, updateRoute } from '@/network/routeManage'

export default {
  name: 'type',
  data () {
    return {
      routeTable: [
      ],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      findRoute: {
        corpname: '',
        routename: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      routeFormAdd: {
        corpName: '',
        routeName: '',
        routeMark: '',
        sortId: ''
      },
      routeFormEdit: {
        corp_name: '',
        id: '',
        route_mark: '',
        route_name: '',
        sort_id: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        routeName: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        routeMark: [
          { required: true, message: '请输入线路标识', trigger: 'blur' }
        ],
        sortId: [
          { required: true, message: '请输入排序id', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        corp_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        route_name: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        route_mark: [
          { required: true, message: '请输入线路标识', trigger: 'blur' }
        ],
        sort_id: [
          { required: true, message: '请输入排序id', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      devTypeAdd: {
        corp_name: '',
        route_mark: '',
        route_name: '',
        sort_id: '',
        id: ''
      },
      devTypeUpdate: {
        corp_name: '',
        route_mark: '',
        route_name: '',
        sort_id: '',
        id: ''
      },
      routeDelete: {
        corp_name: '',
        route_mark: '',
        route_name: '',
        sort_id: '',
        id: ''
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
      timeRange: null
    }
  },
  mounted () {
    this.getRoute()
  },
  methods: {
    submitRouteAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devTypeAdd.corp_name = this.routeFormAdd.corpName
          this.devTypeAdd.route_mark = this.routeFormAdd.routeMark
          this.devTypeAdd.route_name = this.routeFormAdd.routeName
          this.devTypeAdd.sort_id = this.routeFormAdd.sortId
          console.log('---this.devTypeAdd--' + JSON.stringify(this.devTypeAdd))
          addRoute(this.devTypeAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getRoute()
            } else {
              alert('添加失败!')
              this.dialogFormAdd = false
            }
          }).catch(res => {
            console.log(res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateRoute (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devTypeUpdate.corp_name = this.routeFormEdit.corp_name
          this.devTypeUpdate.route_name = this.routeFormEdit.route_name
          this.devTypeUpdate.route_mark = this.routeFormEdit.route_mark
          this.devTypeUpdate.sort_id = this.routeFormEdit.sort_id
          this.devTypeUpdate.id = this.routeFormEdit.id
          console.log('---this.devTypeUpdate--' + JSON.stringify(this.devTypeUpdate))

          updateRoute(this.devTypeUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getRoute()
              alert('修改成功!')
              this.dialogFormEdit = false
            } else {
              alert('修改失败!')
              this.dialogFormEdit = false
            }
          }).catch(res => {
            console.log('-----' + res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取数据
    getRoute () {
      getRoute(this.findRoute).then(res => {
        console.log('---this.findRoute--' + JSON.stringify(this.findRoute))
        console.log('-----' + JSON.stringify(res.data))
        this.routeTable = res.data.content
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findRoute.pagesize = val
      console.log('---this.findRoute--' + JSON.stringify(this.findRoute))
      this.getRoute()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findRoute.pagenum = val - 1
      this.dataIndex = (this.findRoute.pagenum * this.findRoute.pagesize) + 1
      console.log('---this.findRoute--' + JSON.stringify(this.findRoute))
      this.getRoute()
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findRoute))
      this.getRoute()
    },
    clearCondition () {
      this.findRoute.corpname = ''
      this.findRoute.routename = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.routeFormEdit.corp_name = val.corp_name
      this.routeFormEdit.route_name = val.route_name
      this.routeFormEdit.route_mark = val.route_mark
      this.routeFormEdit.sort_id = val.sort_id
      this.routeFormEdit.id = val.id
    },
    handleDelete (val) {
      this.routeDelete.corp_name = val.corp_name
      this.routeDelete.corp_name = val.corp_name
      this.routeDelete.route_name = val.route_name
      this.routeDelete.route_mark = val.route_mark
      this.routeDelete.sort_id = val.sort_id
      this.routeDelete.id = val.id
      console.log('---this.routeDelete--' + JSON.stringify(this.routeDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.routeDelete--' + JSON.stringify(this.routeDelete))
      deleteRoute(this.routeDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getRoute()
          alert('删除成功!')
          this.dialogVisibleDelete = false
        } else {
          alert('删除失败!')
          this.dialogVisibleDelete = false
        }
      })
      this.dialogVisibleDelete = false
    },
    exportExcel () {
      // this.htmlToExcels.exportExcel('控制器管理.xlsx', '#devctrlManage')
      const excelData = this.devctrlTable // 将你要导出的数组数据（historyList）赋值给excelDate
      console.log('--excelData---' + JSON.stringify(this.excelData))
      const tHeader = ['公司名称', '线路名称', '线路标识', '排序id'] // 导出的excel表头名信息
      const filterVal = [
        'corp_name',
        'route_name',
        'route_mark',
        'remarks',
        'sort_id'
      ] // 导出的excel表头字段名，需要导出表格字段名
      const title = '线路管理'
      this.htmlToExcels.export2Excel(excelData, tHeader, filterVal, title) // 调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    }
  }
}
</script>

<style scoped>

</style>
