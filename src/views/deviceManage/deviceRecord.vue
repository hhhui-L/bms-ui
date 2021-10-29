<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findRecordData.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findRecordData.devtype"
          placeholder="请输入设备类型"
        />
      </el-col>
        <el-col :span="2">
          <el-input
            v-model="findRecordData.devnum"
            placeholder="请输入控制器编号"
          />
        </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
        <el-button type="primary" icon="el-icon-s-order" @click="exportExcel">导出</el-button>
      </el-col>
    </el-row>
<!--    <el-row :gutter="10" style="margin-bottom: 10px">-->
<!--      <el-col :span="16">-->
<!--        <el-button type="primary" icon="el-icon-upload" @click="conditionQuery">导入表格</el-button>-->
<!--        <el-button type="primary" icon="el-icon-download" @click="conditionQuery">模板下载</el-button>-->
<!--        <el-button type="primary" icon="el-icon-s-order" @click="clearCondition">导出</el-button>-->
<!--        <el-button type="danger">批量删除</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table
      :data="devRecordTable"
      border
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
        width="55"
        :index="dataIndex"
        align="center">
      </el-table-column>
      <el-table-column label="公司名称" min-width="150px" prop="corp_name" align="center"></el-table-column>
      <el-table-column label="id" v-if="false" min-width="150px" prop="id" align="center"></el-table-column>
      <el-table-column label="设备类型" min-width="150px" prop="dev_type" align="center"></el-table-column>
      <el-table-column label="调试状态" min-width="150px" prop="dev_debug" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dev_debug == false">非调试</span>
          <span v-else>调试</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编号" min-width="150px" prop="dev_num" align="center"></el-table-column>
      <el-table-column label="控制器编号" min-width="200px" prop="ctrl_num" align="center"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="create_time" align="center"></el-table-column>
      <el-table-column label="设备ID" min-width="220px" prop="dev_id" align="center"></el-table-column>
      <el-table-column label="对应电池编号" min-width="150px" prop="bat_model" align="center"></el-table-column>
      <el-table-column label="设备SN码" min-width="150px" prop="dev_sn" align="center"></el-table-column>
      <el-table-column label="操作" width="230" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.dev_type === '电池组'"
            @click="handleDetails(scope.row)">详情</el-button>
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

    <el-dialog title="添加设备档案" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="devrecordFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input v-model="devrecordFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="devType" :label-width="formLabelWidth">
          <el-input v-model="devrecordFormAdd.devType"></el-input>
        </el-form-item>
        <el-form-item label="线路" prop="routeName" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.routeName"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="siteName" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.siteName"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="batModel" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.batModel"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="devNum" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.devNum"></el-input>
        </el-form-item>
        <el-form-item label="控制器编号" prop="ctrlNum" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.ctrlNum"></el-input>
        </el-form-item>
        <el-form-item label="电池编号" prop="batNum" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.batNum"></el-input>
        </el-form-item>
        <el-form-item label="设备SN码" prop="devSn" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.devSn"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号" prop="factNum" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.factNum"></el-input>
        </el-form-item>
        <el-form-item label="投入使用日期" prop="createTime" :label-width="formLabelWidth">
<!--          <el-input type="text" v-model="devrecordFormAdd.createTime"></el-input>-->
          <el-date-picker
            v-model="devrecordFormAdd.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电池组标称容量" prop="batCap" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormAdd.batCap"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitdevrecordAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改设备档案" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="devrecordFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input v-model="devrecordFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="dev_type" :label-width="formLabelWidth">
          <el-input v-model="devrecordFormEdit.dev_type"></el-input>
        </el-form-item>
        <el-form-item label="线路" prop="route_name" :label-width="formLabelWidth">
          <el-input type="text" :disabled="canNotEdit" v-model="devrecordFormEdit.route_name"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="site_name" :label-width="formLabelWidth">
          <el-input type="text" :disabled="canNotEdit" v-model="devrecordFormEdit.site_name"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="bat_model" :label-width="formLabelWidth">
          <el-input type="text" :disabled="canNotEdit" v-model="devrecordFormEdit.bat_model"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="dev_num" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.dev_num"></el-input>
        </el-form-item>
        <el-form-item label="控制器编号" prop="ctrl_num" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.ctrl_num"></el-input>
        </el-form-item>
        <el-form-item label="电池编号" prop="bat_num" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.bat_num"></el-input>
        </el-form-item>
        <el-form-item label="设备SN码" prop="dev_sn" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.dev_sn"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号" prop="fact_num" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.fact_num"></el-input>
        </el-form-item>
        <el-form-item label="投入使用日期" prop="create_time" :label-width="formLabelWidth">
          <!--          <el-input type="text" v-model="devrecordFormEdit.createTime"></el-input>-->
          <el-date-picker
            v-model="devrecordFormEdit.create_time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电池组标称容量" prop="bat_cap" :label-width="formLabelWidth">
          <el-input type="text" v-model="devrecordFormEdit.bat_cap"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="updateDevrecord('ruleFormEdit')">确 定</el-button>
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
import { addDevrecord, deleteDevrecord, getDevrecord, updateDevrecord } from '@/network/devRecord'
import { exchangeDate } from '@/network/time'

export default {
  name: 'deviceRecord',
  data () {
    return {
      devRecordTable: [],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      formLabelWidth: '125px',
      canNotEdit: true,
      findRecordData: {
        corpname: '',
        devtype: '',
        devnum: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      devrecordFormAdd: {
        batCap: '',
        batModel: '',
        batNum: '',
        corpName: '',
        createTime: '',
        ctrlNum: '',
        devDebug: false,
        devId: '',
        devNum: '',
        devSn: '',
        devType: '',
        factNum: '',
        id: '',
        routeName: '',
        siteName: ''
      },
      devrecordAdd: {
        bat_cap: '',
        bat_model: '',
        bat_num: '',
        corp_name: '',
        create_time: '',
        ctrl_num: '',
        dev_debug: false,
        dev_id: '',
        dev_num: '',
        dev_sn: '',
        dev_type: '',
        fact_num: '',
        id: '',
        route_name: '',
        site_name: ''
      },
      devrecordFormEdit: {
        bat_cap: '',
        bat_model: '',
        bat_num: '',
        corp_name: '',
        create_time: '',
        ctrl_num: '',
        dev_debug: false,
        dev_id: '0',
        dev_num: '',
        dev_sn: '',
        dev_type: '',
        fact_num: '',
        id: '',
        route_name: '',
        site_name: ''
      },
      devrecordUpdate: {
        bat_cap: '',
        bat_model: '',
        bat_num: '',
        corp_name: '',
        create_time: '',
        ctrl_num: '',
        dev_debug: false,
        dev_id: '0',
        dev_num: '',
        dev_sn: '',
        dev_type: '',
        fact_num: '',
        id: '',
        route_name: '',
        site_name: ''
      },
      devrecordDelete: {
        bat_cap: '',
        bat_model: '',
        bat_num: '',
        corp_name: '',
        create_time: '',
        ctrl_num: '',
        dev_debug: false,
        dev_id: '0',
        dev_num: '',
        dev_sn: '',
        dev_type: '',
        fact_num: '',
        id: 0,
        route_name: '',
        site_name: ''
      },
      rules: {
        corp_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        dev_type: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ],
        route_name: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        site_name: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        bat_model: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        dev_num: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        ctrl_num: [
          { required: true, message: '请输入控制器编号', trigger: 'blur' }
        ],
        bat_num: [
          { required: true, message: '请输入电池编号', trigger: 'blur' }
        ],
        dev_sn: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        fact_num: [
          { required: true, message: '请输入出厂编号', trigger: 'blur' }
        ],
        create_time: [
          { required: true, message: '请输入投入使用日期', trigger: 'blur' }
        ],
        bat_cap: [
          { required: true, message: '请输入电池组标称容量', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        devType: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ],
        // routeName: [
        //   { required: true, message: '请输入线路名称', trigger: 'blur' }
        // ],
        // siteName: [
        //   { required: true, message: '请输入站点名称', trigger: 'blur' }
        // ],
        // batModel: [
        //   { required: true, message: '请输入设备型号', trigger: 'blur' }
        // ],
        devNum: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        ctrlNum: [
          { required: true, message: '请输入控制器编号', trigger: 'blur' }
        ],
        batNum: [
          { required: true, message: '请输入电池编号', trigger: 'blur' }
        ],
        devSn: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        factNum: [
          { required: true, message: '请输入出厂编号', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请输入投入使用日期', trigger: 'blur' }
        ],
        batCap: [
          { required: true, message: '请输入电池组标称容量', trigger: 'blur' }
        ]
      },

      devInfo: null,
      prjInfo: null,

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
  },
  mounted () {
    this.getDevrecord()
  },
  methods: {
    // 获取控制器数据
    getDevrecord () {
      getDevrecord(this.findRecordData).then(res => {
        console.log('---this.findRecordData--' + JSON.stringify(this.findRecordData))
        console.log('-----' + JSON.stringify(res.data))
        this.devRecordTable = res.data.content
        console.log('-----' + res.data.totalElements)
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    submitdevrecordAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devrecordAdd.bat_cap = this.devrecordFormAdd.batCap
          this.devrecordAdd.bat_model = this.devrecordFormAdd.batModel
          this.devrecordAdd.bat_num = this.devrecordFormAdd.batNum
          this.devrecordAdd.corp_name = this.devrecordFormAdd.corpName
          this.devrecordAdd.create_time = exchangeDate(this.devrecordFormAdd.createTime)
          this.devrecordAdd.ctrl_num = this.devrecordFormAdd.ctrlNum
          this.devrecordAdd.dev_debug = this.devrecordFormAdd.devDebug
          this.devrecordAdd.dev_num = this.devrecordFormAdd.devNum
          this.devrecordAdd.dev_sn = this.devrecordFormAdd.devSn
          this.devrecordAdd.dev_type = this.devrecordFormAdd.devType
          this.devrecordAdd.fact_num = this.devrecordFormAdd.factNum
          this.devrecordAdd.route_name = this.devrecordFormAdd.routeName
          this.devrecordAdd.site_name = this.devrecordFormAdd.siteName
          console.log('---this.devrecordAdd--' + JSON.stringify(this.devrecordAdd))

          addDevrecord(this.devrecordAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              console.log('-----' + JSON.stringify(this.findRecordData))
              this.getDevrecord()
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findRecordData.pagesize = val
      console.log('---this.findRecordData--' + JSON.stringify(this.findRecordData))
      this.getDevrecord()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findRecordData.pagenum = val - 1
      this.dataIndex = (this.findRecordData.pagenum * this.findRecordData.pagesize) + 1
      console.log('---this.findRecordData--' + JSON.stringify(this.findRecordData))
      this.getDevrecord()
    },
    handleEdit (val) {
      this.dialogFormEdit = true
      this.devrecordFormEdit.bat_cap = val.bat_cap
      this.devrecordFormEdit.bat_model = val.bat_model
      this.devrecordFormEdit.bat_num = val.bat_num
      this.devrecordFormEdit.corp_name = val.corp_name
      // this.devrecordFormEdit.create_time = val.create_time
      this.devrecordFormEdit.ctrl_num = val.ctrl_num
      this.devrecordFormEdit.dev_debug = val.dev_debug
      this.devrecordFormEdit.dev_num = val.dev_num
      this.devrecordFormEdit.dev_sn = val.dev_sn
      this.devrecordFormEdit.dev_type = val.dev_type
      this.devrecordFormEdit.fact_num = val.fact_num
      this.devrecordFormEdit.route_name = val.route_name
      this.devrecordFormEdit.site_name = val.site_name
      this.devrecordFormEdit.id = val.id
    },
    updateDevrecord (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devrecordUpdate.bat_cap = this.devrecordFormEdit.bat_cap
          this.devrecordUpdate.bat_model = this.devrecordFormEdit.bat_model
          this.devrecordUpdate.bat_num = this.devrecordFormEdit.bat_num
          this.devrecordUpdate.corp_name = this.devrecordFormEdit.corp_name
          this.devrecordUpdate.create_time = exchangeDate(this.devrecordFormEdit.create_time)
          this.devrecordUpdate.ctrl_num = this.devrecordFormEdit.ctrl_num
          this.devrecordUpdate.dev_debug = this.devrecordFormEdit.dev_debug
          this.devrecordUpdate.dev_num = this.devrecordFormEdit.dev_num
          this.devrecordUpdate.dev_sn = this.devrecordFormEdit.dev_sn
          this.devrecordUpdate.dev_type = this.devrecordFormEdit.dev_type
          this.devrecordUpdate.fact_num = this.devrecordFormEdit.fact_num
          this.devrecordUpdate.route_name = this.devrecordFormEdit.route_name
          this.devrecordUpdate.site_name = this.devrecordFormEdit.site_name
          this.devrecordUpdate.id = this.devrecordFormEdit.id

          console.log('---this.devrecordUpdate--' + JSON.stringify(this.devrecordUpdate))

          updateDevrecord(this.devrecordUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getDevrecord()
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
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findRecordData))
      this.getDevrecord()
    },
    clearCondition () {
      this.findRecordData.corpname = ''
      this.findRecordData.devtype = ''
      this.findRecordData.devnum = ''
    },
    handleDelete (val) {
      this.devrecordDelete.bat_cap = val.bat_cap
      this.devrecordDelete.bat_model = val.bat_model
      this.devrecordDelete.bat_num = val.bat_num
      this.devrecordDelete.corp_name = val.corp_name
      this.devrecordDelete.create_time = val.create_time
      this.devrecordDelete.ctrl_num = val.ctrl_num
      this.devrecordDelete.dev_debug = val.dev_debug
      this.devrecordDelete.dev_num = val.dev_num
      this.devrecordDelete.dev_sn = val.dev_sn
      this.devrecordDelete.dev_type = val.dev_type
      this.devrecordDelete.fact_num = val.fact_num
      this.devrecordDelete.route_name = val.route_name
      this.devrecordDelete.site_name = val.site_name
      this.devrecordDelete.id = val.id
      console.log('---this.devrecordDelete--' + JSON.stringify(this.devrecordDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.devrecordDelete--' + JSON.stringify(this.devrecordDelete))
      deleteDevrecord(this.devrecordDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getDevrecord()
          alert('删除成功!')
          this.dialogVisibleDelete = false
        } else {
          alert('删除失败!')
          this.dialogVisibleDelete = false
        }
      })
      this.dialogVisibleDelete = false
    },
    handleDetails (val) {
      this.$router.push({
        path: '/sensor/details',
        query: {
          packid: val.dev_id,
          dev_num: val.dev_num,
          dev_type: val.dev_type
        }
      })
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
      const title = '设备档案'
      this.htmlToExcels.export2Excel(excelData, tHeader, filterVal, title) // 调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    }
  }
}
</script>

<style scoped>

</style>
