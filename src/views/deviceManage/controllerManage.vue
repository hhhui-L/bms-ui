<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
<!--        <el-select v-model="queryExpHisBean.laboratory" placeholder="请选择业主">-->
<!--          <el-option-->
<!--            v-for="item in laboratory"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
        <el-input
          v-model="findctrlData.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findctrlData.ctrlname"
          placeholder="请输入控制器名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findctrlData.ctrladdress"
          placeholder="请输入控制器所属省份"
        />
      </el-col>
      <el-col :span="16">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
<!--        <el-button type="primary" icon="el-icon-upload" @click="conditionQuery">导入表格</el-button>-->
<!--        <el-button type="primary" icon="el-icon-download" @click="conditionQuery">模板下载</el-button>-->
        <el-button type="primary" icon="el-icon-s-order" @click="exportExcel">导出</el-button>
<!--        <el-button type="danger">批量删除</el-button>-->
      </el-col>
    </el-row>

    <el-table
      :data="devctrlTable"
      border
      id="devctrlManage"
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        prop="order"
        width="60"
        :index="dataIndex"
        align="center">
      </el-table-column>
      <el-table-column label="公司名称" min-width="150px" prop="corp_name" align="center"></el-table-column>
      <el-table-column label="id" v-if="false" min-width="150px" prop="id" align="center"></el-table-column>
      <el-table-column label="控制器编号" min-width="150px" prop="ctrl_num" align="center"></el-table-column>
      <el-table-column label="控制器名称" min-width="150px" prop="ctrl_name" align="center"></el-table-column>
      <el-table-column label="所属省份" min-width="120px" prop="ctrl_address" align="center"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="create_time" align="center"></el-table-column>
      <el-table-column label="设备ID" min-width="200px" prop="dev_id" align="center"></el-table-column>
      <el-table-column label="设备token" min-width="200px" prop="dev_token" align="center"></el-table-column>
      <el-table-column label="备注" min-width="200px" prop="remarks" align="center"></el-table-column>
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

    <el-dialog title="添加控制器信息" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="devctrlFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="控制器名称" prop="ctrlName" :label-width="formLabelWidth">
          <el-input v-model="devctrlFormAdd.ctrlName"></el-input>
        </el-form-item>
        <el-form-item label="控制器编号" prop="ctrlNum" :label-width="formLabelWidth">
          <el-input v-model="devctrlFormAdd.ctrlNum"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input type="text" v-model="devctrlFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="ctrlAddr" :label-width="formLabelWidth">
          <el-input type="text" v-model="devctrlFormAdd.ctrlAddr"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="devctrlFormAdd.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitdevctrlInfoAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改控制器信息" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="devctrlFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="控制器名称" prop="ctrl_name" :label-width="formLabelWidth">
          <el-input v-model="devctrlFormEdit.ctrl_name"></el-input>
        </el-form-item>
        <el-form-item label="控制器编号" prop="ctrl_num" :label-width="formLabelWidth">
          <el-input v-model="devctrlFormEdit.ctrl_num"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="devctrlFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="ctrl_address" :label-width="formLabelWidth">
          <el-input type="text" v-model="devctrlFormEdit.ctrl_address"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="devctrlFormEdit.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="updateDevctrlInfo('ruleFormEdit')">确 定</el-button>
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
import { addDevctrl, deleteDevctrl, getctrlData, updateDevctrl } from '@/network/devctrlManage'
import { formatDate } from '@/network/time'
export default {
  name: 'Manage',
  data () {
    return {
      devctrlTable: [],
      excelData: [],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      formLabelWidth: '120px',
      devctrlFormAdd: {
        id: '',
        corpName: '',
        ctrlNum: '',
        ctrlName: '',
        ctrlAddr: '',
        remarks: '',
        createTime: '',
        deviceId: '',
        deviceToken: ''
      },
      devctrlFormEdit: {
        corp_name: '',
        create_time: '',
        ctrl_name: '',
        ctrl_num: '',
        dev_id: '',
        dev_token: '',
        remarks: '',
        id: '',
        ctrl_address: ''
      },
      rules: {
        ctrlName: [
          { required: true, message: '请输入控制器名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ctrlNum: [
          { required: true, message: '请输入控制器编号', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        ctrlAddr: [
          { required: true, message: '请输入所属省份', trigger: 'blur' }
        ],
        remarks: [
          { required: false, message: '请填写备注', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        ctrl_name: [
          { required: true, message: '请输入控制器名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ctrl_num: [
          { required: true, message: '请输入控制器编号', trigger: 'blur' }
        ],
        corp_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        ctrl_address: [
          { required: true, message: '请输入所属省份', trigger: 'blur' }
        ],
        remarks: [
          { required: false, message: '请填写备注', trigger: 'blur' }
        ]
      },
      devctrlInfoAdd: {
        corp_name: '',
        create_time: '',
        ctrl_name: '',
        ctrl_num: '',
        dev_id: '',
        dev_token: '',
        id: '',
        remarks: '',
        ctrl_address: ''
      },
      devctrlInfoUpdate: {
        corp_name: '',
        create_time: '',
        ctrl_name: '',
        ctrl_num: '',
        dev_id: '',
        dev_token: '',
        id: '',
        remarks: '',
        ctrl_address: ''
      },
      devctrlInfoDelete: {
        corp_name: '',
        create_time: '',
        ctrl_name: '',
        ctrl_num: '',
        dev_id: '',
        dev_token: '',
        id: '',
        remarks: '',
        ctrl_address: ''
      },
      findctrlData: {
        corpname: '',
        ctrlname: '',
        ctrladdress: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      totalCount: 400, // 总条目数
      pageSizeList: [10, 20, 50, 100], // 选择每页显示个数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条目数
      dataIndex: 1,
      // currentPageCount: 0,
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
  },
  mounted () {
    this.getctrlData()
  },
  methods: {
    // 获取控制器数据
    getctrlData () {
      // const baseUrl = 'http://192.168.0.122:5000/dev/findctrl'
      // const url = baseUrl + '?pagenum=' + this.findctrlData.pageNumber + '&pagesize=' + this.findctrlData.pageSize
      // console.log('--------url---------' + url)
      // axios({
      //   url: url,
      //   method: 'post'
      // }).then((res) => {
      //   console.log(res.data)
      //   // }
      // })
      getctrlData(this.findctrlData).then(res => {
        console.log('---this.findctrlData--' + JSON.stringify(this.findctrlData))
        console.log('-----' + JSON.stringify(res.data))
        this.devctrlTable = res.data.content
        console.log('-----' + res.data.totalElements)
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    submitdevctrlInfoAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devctrlInfoAdd.ctrl_name = this.devctrlFormAdd.ctrlName
          this.devctrlInfoAdd.ctrl_num = this.devctrlFormAdd.ctrlNum
          this.devctrlInfoAdd.corp_name = this.devctrlFormAdd.corpName
          this.devctrlInfoAdd.remarks = this.devctrlFormAdd.remarks
          this.devctrlInfoAdd.ctrl_address = this.devctrlFormAdd.ctrlAddr
          console.log('---this.devctrlInfoAdd--' + JSON.stringify(this.devctrlInfoAdd))

          addDevctrl(this.devctrlInfoAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              console.log('-----' + JSON.stringify(this.findctrlData))
              this.getctrlData()
            } else {
              alert('添加失败!')
              this.dialogFormAdd = false
            }
          }).catch(res => {
            // 具体逻辑
            console.log(res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateDevctrlInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devctrlInfoUpdate.corp_name = this.devctrlFormEdit.corp_name
          this.devctrlInfoUpdate.create_time = formatDate()
          this.devctrlInfoUpdate.ctrl_num = this.devctrlFormEdit.ctrl_num
          this.devctrlInfoUpdate.ctrl_name = this.devctrlFormEdit.ctrl_name
          this.devctrlInfoUpdate.dev_id = this.devctrlFormEdit.dev_id
          this.devctrlInfoUpdate.id = this.devctrlFormEdit.id
          this.devctrlInfoUpdate.dev_token = this.devctrlFormEdit.dev_token
          this.devctrlInfoUpdate.remarks = this.devctrlFormEdit.remarks
          this.devctrlInfoUpdate.ctrl_address = this.devctrlFormEdit.ctrl_address
          console.log('---this.devctrlInfoUpdate--' + JSON.stringify(this.devctrlInfoUpdate))

          updateDevctrl(this.devctrlInfoUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getctrlData()
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findctrlData.pagesize = val
      console.log('---this.findctrlData--' + JSON.stringify(this.findctrlData))
      this.getctrlData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findctrlData.pagenum = val - 1
      this.dataIndex = (this.findctrlData.pagenum * this.findctrlData.pagesize) + 1
      console.log('---this.findctrlData--' + JSON.stringify(this.findctrlData))
      this.getctrlData()
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.devctrlFormEdit.corp_name = val.corp_name
      this.devctrlFormEdit.ctrl_name = val.ctrl_name
      this.devctrlFormEdit.ctrl_num = val.ctrl_num
      this.devctrlFormEdit.dev_token = val.dev_token
      this.devctrlFormEdit.id = val.id
      this.devctrlFormEdit.remarks = val.remarks
      this.devctrlFormEdit.dev_id = val.dev_id
      this.devctrlFormEdit.ctrl_address = val.ctrl_address
    },
    handleDelete (val) {
      this.devctrlInfoDelete.corp_name = val.corp_name
      this.devctrlInfoDelete.create_time = val.create_time
      this.devctrlInfoDelete.ctrl_name = val.ctrl_name
      this.devctrlInfoDelete.dev_id = val.dev_id
      this.devctrlInfoDelete.dev_token = val.dev_token
      this.devctrlInfoDelete.id = val.id
      this.devctrlInfoDelete.remarks = val.remarks
      this.devctrlInfoDelete.ctrl_address = val.ctrl_address
      console.log('---this.devctrlInfoDelete--' + JSON.stringify(this.devctrlInfoDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.devctrlInfoDelete--' + JSON.stringify(this.devctrlInfoDelete))
      deleteDevctrl(this.devctrlInfoDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getctrlData()
          alert('删除成功!')
          this.dialogVisibleDelete = false
          console.log('-----' + JSON.stringify(this.findctrlData))
          this.getctrlData()
        } else {
          alert('删除失败!')
          this.dialogVisibleDelete = false
        }
      })
      this.dialogVisibleDelete = false
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findctrlData))
      this.getctrlData()
    },
    clearCondition () {
      this.findctrlData.ctrlname = ''
      this.findctrlData.corpname = ''
      this.findctrlData.ctrladdress = ''
    },
    exportExcel () {
      // this.htmlToExcels.exportExcel('控制器管理.xlsx', '#devctrlManage')
      const excelData = this.devctrlTable // 将你要导出的数组数据（historyList）赋值给excelDate
      console.log('--excelData---' + JSON.stringify(this.excelData))
      const tHeader = ['公司名称', '控制器编号', '控制器名称', '所属省份', '创建时间', '设备id', '设备token', '备注'] // 导出的excel表头名信息
      const filterVal = [
        'corp_name',
        'ctrl_num',
        'ctrl_name',
        'ctrl_address',
        'create_time',
        'dev_id',
        'dev_token',
        'remarks'
      ] // 导出的excel表头字段名，需要导出表格字段名
      const title = '控制器管理'
      this.htmlToExcels.export2Excel(excelData, tHeader, filterVal, title) // 调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    }
  }
}
</script>

<style scoped>

</style>
