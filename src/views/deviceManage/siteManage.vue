<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findSite.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findSite.sitename"
          placeholder="请输入站点名称"
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
      :data="siteTable"
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
      <el-table-column label="站点名称" min-width="200px" prop="site_name" align="center"></el-table-column>
      <el-table-column label="站点名称(英文)" min-width="200px" prop="site_name_en" align="center"></el-table-column>
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

    <el-dialog title="添加站点" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="siteFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input v-model="siteFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="线路" prop="routeName" :label-width="formLabelWidth">
          <el-input v-model="siteFormAdd.routeName"></el-input>
        </el-form-item>
        <el-form-item label="站点名称" prop="siteName" :label-width="formLabelWidth">
          <el-input v-model="siteFormAdd.siteName"></el-input>
        </el-form-item>
        <el-form-item label="站点名称(英文)" prop="siteNameEN" :label-width="formLabelWidth">
          <el-input v-model="siteFormAdd.siteNameEN"></el-input>
        </el-form-item>
        <el-form-item label="排序id" prop="sortId" :label-width="formLabelWidth">
          <el-input v-model="siteFormAdd.sortId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitSiteAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改站点" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="siteFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="siteFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="线路" prop="route_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="siteFormEdit.route_name"></el-input>
        </el-form-item>
        <el-form-item label="站点名称" prop="site_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="siteFormEdit.site_name"></el-input>
        </el-form-item>
        <el-form-item label="站点名称(英文)" prop="site_name_en" :label-width="formLabelWidth">
          <el-input type="text" v-model="siteFormEdit.site_name_en"></el-input>
        </el-form-item>
        <el-form-item label="排序id" prop="sort_id" :label-width="formLabelWidth">
          <el-input type="text" v-model="siteFormEdit.sort_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="updateDevtype('ruleFormEdit')">确 定</el-button>
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
import { addSite, deleteSite, getSite, updateSite } from '@/network/siteManage'

export default {
  name: 'type',
  data () {
    return {
      siteTable: [],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      findSite: {
        corpname: '',
        sitename: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      siteFormAdd: {
        corpName: '',
        routeName: '',
        siteName: '',
        siteNameEN: '',
        sortId: ''
      },
      siteFormEdit: {
        corp_name: '',
        id: '',
        route_name: '',
        site_name: '',
        site_name_en: '',
        sort_id: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        routeName: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        siteName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        siteNameEN: [
          { required: true, message: '请输入站点名称(英文)', trigger: 'blur' }
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
        site_name: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        site_name_en: [
          { required: true, message: '请输入站点名称(英文)', trigger: 'blur' }
        ],
        sort_id: [
          { required: true, message: '请输入排序id', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      siteAdd: {
        corp_name: '',
        route_name: '',
        site_name: '',
        site_name_en: '',
        sort_id: '',
        id: ''
      },
      siteUpdate: {
        corp_name: '',
        route_name: '',
        site_name: '',
        site_name_en: '',
        sort_id: '',
        id: ''
      },
      siteDelete: {
        corp_name: '',
        route_name: '',
        site_name: '',
        site_name_en: '',
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
    this.getSite()
  },
  methods: {
    submitSiteAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.siteAdd.corp_name = this.siteFormAdd.corpName
          this.siteAdd.route_name = this.siteFormAdd.routeName
          this.siteAdd.site_name = this.siteFormAdd.siteName
          this.siteAdd.site_name_en = this.siteFormAdd.siteNameEN
          this.siteAdd.sort_id = this.siteFormAdd.sortId
          console.log('---this.siteAdd--' + JSON.stringify(this.siteAdd))
          addSite(this.siteAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getSite()
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
    updateDevtype (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.siteUpdate.corp_name = this.siteFormEdit.corp_name
          this.siteUpdate.route_name = this.siteFormEdit.route_name
          this.siteUpdate.site_name = this.siteFormEdit.site_name
          this.siteUpdate.site_name_en = this.siteFormEdit.site_name_en
          this.siteUpdate.sort_id = this.siteFormEdit.sort_id
          this.siteUpdate.id = this.siteFormEdit.id
          console.log('---this.siteUpdate--' + JSON.stringify(this.siteUpdate))

          updateSite(this.siteUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getSite()
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
    getSite () {
      getSite(this.findSite).then(res => {
        console.log('---this.findSite--' + JSON.stringify(this.findSite))
        console.log('-----' + JSON.stringify(res.data))
        this.siteTable = res.data.content
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findSite.pagesize = val
      console.log('---this.findSite--' + JSON.stringify(this.findSite))
      this.getSite()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findSite.pagenum = val - 1
      this.dataIndex = (this.findSite.pagenum * this.findSite.pagesize) + 1
      console.log('---this.findSite--' + JSON.stringify(this.findSite))
      this.getSite()
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findSite))
      this.getSite()
    },
    clearCondition () {
      this.findSite.corpname = ''
      this.findSite.sitename = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.siteFormEdit.corp_name = val.corp_name
      this.siteFormEdit.route_name = val.route_name
      this.siteFormEdit.site_name = val.site_name
      this.siteFormEdit.site_name_en = val.site_name_en
      this.siteFormEdit.sort_id = val.sort_id
      this.siteFormEdit.id = val.id
    },
    handleDelete (val) {
      this.siteDelete.corp_name = val.corp_name
      this.siteDelete.route_name = val.route_name
      this.siteDelete.site_name_en = val.site_name_en
      this.siteDelete.site_name = val.site_name
      this.siteDelete.sort_id = val.sort_id
      this.siteDelete.id = val.id
      console.log('---this.siteDelete--' + JSON.stringify(this.siteDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.siteDelete--' + JSON.stringify(this.siteDelete))
      deleteSite(this.siteDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getSite()
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
      const tHeader = ['公司名称', '线路名称', '站点名称', '站点名称(英文)', '排序id'] // 导出的excel表头名信息
      const filterVal = [
        'corp_name',
        'route_name',
        'site_name',
        'site_name_en',
        'sort_id'
      ] // 导出的excel表头字段名，需要导出表格字段名
      const title = '站点管理'
      this.htmlToExcels.export2Excel(excelData, tHeader, filterVal, title) // 调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    }
  }
}
</script>

<style scoped>

</style>
