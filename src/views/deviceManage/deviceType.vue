<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findDevtype.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findDevtype.typename"
          placeholder="请输入设备类型"
        />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="devTypeTable"
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
      <el-table-column label="类型名称" min-width="150px" prop="type_name" align="center"></el-table-column>
      <el-table-column label="创建时间" min-width="200px" prop="create_time" align="center"></el-table-column>
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

    <el-dialog title="添加设备类型" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="devTypeFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input v-model="devTypeFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" prop="typeName" :label-width="formLabelWidth">
          <el-input v-model="devTypeFormAdd.typeName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitdevTypeAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改设备类型" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="devTypeFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="devTypeFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" prop="type_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="devTypeFormEdit.type_name"></el-input>
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
import { addDevtype, deleteDevtype, getDevtype, updateDevtype } from '@/network/devType'
import { formatDate } from '@/network/time'

export default {
  name: 'type',
  data () {
    return {
      devTypeTable: [
      ],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      findDevtype: {
        corpname: '',
        typename: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      devTypeFormAdd: {
        corpName: '',
        typeName: ''
      },
      devTypeFormEdit: {
        corp_name: '',
        type_name: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        corp_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        type_name: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      devTypeAdd: {
        corp_name: '',
        create_time: '',
        type_name: '',
        id: ''
      },
      devTypeUpdate: {
        corp_name: '',
        create_time: '',
        type_name: '',
        id: ''
      },
      devTypeDelete: {
        corp_name: '',
        create_time: '',
        type_name: '',
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
    this.getDevtype()
  },
  methods: {
    submitdevTypeAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.devTypeAdd.corp_name = this.devTypeFormAdd.corpName
          this.devTypeAdd.type_name = this.devTypeFormAdd.typeName
          this.devTypeAdd.create_time = formatDate()
          console.log('---this.devTypeAdd--' + JSON.stringify(this.devTypeAdd))
          addDevtype(this.devTypeAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getDevtype()
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
          this.devTypeUpdate.corp_name = this.devTypeFormEdit.corp_name
          this.devTypeUpdate.type_name = this.devTypeFormEdit.type_name
          this.devTypeUpdate.create_time = formatDate()
          this.devTypeUpdate.id = this.devTypeFormEdit.id
          console.log('---this.devTypeUpdate--' + JSON.stringify(this.devTypeUpdate))

          updateDevtype(this.devTypeUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getDevtype()
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
    getDevtype () {
      getDevtype(this.findDevtype).then(res => {
        console.log('---this.findDevtype--' + JSON.stringify(this.findDevtype))
        console.log('-----' + JSON.stringify(res.data))
        this.devTypeTable = res.data.content
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findDevtype.pagesize = val
      console.log('---this.findDevtype--' + JSON.stringify(this.findDevtype))
      this.getDevtype()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findDevtype.pagenum = val - 1
      this.dataIndex = (this.findDevtype.pagenum * this.findDevtype.pagesize) + 1
      console.log('---this.findDevtype--' + JSON.stringify(this.findDevtype))
      this.getDevtype()
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findDevtype))
      this.getDevtype()
    },
    clearCondition () {
      this.findDevtype.corpname = ''
      this.findDevtype.typename = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.devTypeFormEdit.corp_name = val.corp_name
      this.devTypeFormEdit.type_name = val.type_name
      this.devTypeFormEdit.id = val.id
    },
    handleDelete (val) {
      this.devTypeDelete.corp_name = val.corp_name
      this.devTypeDelete.create_time = val.create_time
      this.devTypeDelete.type_name = val.type_name
      this.devTypeDelete.id = val.id
      console.log('---this.devTypeDelete--' + JSON.stringify(this.devTypeDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.devTypeDelete--' + JSON.stringify(this.devTypeDelete))
      deleteDevtype(this.devTypeDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getDevtype()
          alert('删除成功!')
          this.dialogVisibleDelete = false
        } else {
          alert('删除失败!')
          this.dialogVisibleDelete = false
        }
      })
      this.dialogVisibleDelete = false
    }
  }
}
</script>

<style scoped>

</style>
