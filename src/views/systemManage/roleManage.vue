<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findRole.corpname"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findRole.rolename"
          placeholder="请输入角色名称"
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
      <el-table-column label="角色关键字" min-width="150px" prop="role_keywords" align="center"></el-table-column>
      <el-table-column label="角色名称" min-width="200px" prop="role_name" align="center"></el-table-column>
      <el-table-column label="联系电话" min-width="200px" prop="phone" align="center"></el-table-column>
      <el-table-column label="邮箱" min-width="200px" prop="email" align="center"></el-table-column>
      <el-table-column label="说明" min-width="200px" prop="instruction" align="center"></el-table-column>
      <el-table-column label="操作" width="260" fixed="right" align="center">
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
            type="warning"
            @click="sendMonthReport(scope.row)">发送月报</el-button>
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

    <el-dialog title="添加角色" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="roleFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="corpName" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.corpName"></el-input>
        </el-form-item>
        <el-form-item label="角色关键字" prop="roleKeywords" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.roleKeywords"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.roleName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.email"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="instruction" :label-width="formLabelWidth">
          <el-input v-model="roleFormAdd.instruction"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitRoleAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="roleFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="corp_name" :label-width="formLabelWidth">
          <el-input type="text" v-model="roleFormEdit.corp_name"></el-input>
        </el-form-item>
        <el-form-item label="角色关键字" prop="role_keywords" :label-width="formLabelWidth">
          <el-input v-model="roleFormEdit.role_keywords"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="role_name" :label-width="formLabelWidth">
          <el-input v-model="roleFormEdit.role_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="roleFormEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email" :label-width="formLabelWidth">
          <el-input v-model="roleFormEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="instruction" :label-width="formLabelWidth">
          <el-input v-model="roleFormEdit.instruction"></el-input>
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
import { addRole, deleteRole, getRole, sendMonthReport, updateRole } from '@/network/roleManage'

export default {
  name: 'type',
  data () {
    return {
      devTypeTable: [
      ],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      findRole: {
        corpname: '',
        rolename: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      roleFormAdd: {
        corpName: '',
        roleKeywords: '',
        roleName: '',
        phone: '',
        email: '',
        instruction: ''
      },
      roleFormEdit: {
        corp_name: '',
        role_keywords: '',
        role_name: '',
        phone: '',
        email: '',
        instruction: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        roleKeywords: [
          { required: true, message: '请输入角色关键字', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        instruction: [
          { required: false, message: '请输入说明', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        corp_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        role_keywords: [
          { required: true, message: '请输入角色关键字', trigger: 'blur' }
        ],
        role_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        instruction: [
          { required: false, message: '请输入说明', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      roleAdd: {
        corp_name: '',
        role_keywords: '',
        role_name: '',
        phone: '',
        email: '',
        instruction: '',
        id: ''
      },
      roleUpdate: {
        corp_name: '',
        role_keywords: '',
        role_name: '',
        phone: '',
        email: '',
        instruction: '',
        id: ''
      },
      roleDelete: {
        corp_name: '',
        role_keywords: '',
        role_name: '',
        phone: '',
        email: '',
        instruction: '',
        id: ''
      },
      emailForm: {
        username: '',
        email: ''
      },
      totalCount: 400, // 总条目数
      pageSizeList: [10, 20, 50, 100], // 选择每页显示个数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条目数
      dataIndex: 1
    }
  },
  mounted () {
    this.getRole()
  },
  methods: {
    submitRoleAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleAdd.corp_name = this.roleFormAdd.corpName
          this.roleAdd.role_keywords = this.roleFormAdd.roleKeywords
          this.roleAdd.role_name = this.roleFormAdd.roleName
          this.roleAdd.phone = this.roleFormAdd.phone
          this.roleAdd.email = this.roleFormAdd.email
          this.roleAdd.instruction = this.roleFormAdd.instruction
          console.log('---this.roleAdd--' + JSON.stringify(this.roleAdd))
          addRole(this.roleAdd).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getRole()
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
          this.roleUpdate.corp_name = this.roleFormEdit.corp_name
          this.roleUpdate.role_keywords = this.roleFormEdit.role_keywords
          this.roleUpdate.role_name = this.roleFormEdit.role_name
          this.roleUpdate.phone = this.roleFormEdit.phone
          this.roleUpdate.email = this.roleFormEdit.email
          this.roleUpdate.instruction = this.roleFormEdit.instruction
          this.roleUpdate.id = this.roleFormEdit.id
          console.log('---this.roleUpdate--' + JSON.stringify(this.roleUpdate))

          updateRole(this.roleUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data === 'success') {
              this.getRole()
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
    getRole () {
      getRole(this.findRole).then(res => {
        console.log('---this.findRole--' + JSON.stringify(this.findRole))
        console.log('-----' + JSON.stringify(res.data))
        this.devTypeTable = res.data.content
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findRole.pagesize = val
      console.log('---this.findRole--' + JSON.stringify(this.findRole))
      this.getRole()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findRole.pagenum = val - 1
      this.dataIndex = (this.findRole.pagenum * this.findRole.pagesize) + 1
      console.log('---this.findRole--' + JSON.stringify(this.findRole))
      this.getRole()
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findRole))
      this.getRole()
    },
    clearCondition () {
      this.findRole.corpname = ''
      this.findRole.rolename = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.roleFormEdit.corp_name = val.corp_name
      this.roleFormEdit.role_keywords = val.role_keywords
      this.roleFormEdit.role_name = val.role_name
      this.roleFormEdit.phone = val.phone
      this.roleFormEdit.email = val.email
      this.roleFormEdit.instruction = val.instruction
      this.roleFormEdit.id = val.id
    },
    handleDelete (val) {
      this.roleDelete.corp_name = val.corp_name
      this.roleDelete.role_keywords = val.role_keywords
      this.roleDelete.role_name = val.role_name
      this.roleDelete.phone = val.phone
      this.roleDelete.email = val.email
      this.roleDelete.instruction = val.instruction
      this.roleDelete.id = val.id
      console.log('---this.roleDelete--' + JSON.stringify(this.roleDelete))
      this.dialogVisibleDelete = true
    },
    sendMonthReport (val) {
      this.emailForm.username = val.role_keywords
      this.emailForm.email = val.email
      console.log('---this.emailForm--' + JSON.stringify(this.emailForm))
      sendMonthReport(this.emailForm).then(res => {
        if (res.data.code === 20000) {
          alert('发送成功!')
        } else {
          alert('发送失败!')
        }
      })
    },
    doDelete () {
      console.log('---this.roleDelete--' + JSON.stringify(this.roleDelete))
      deleteRole(this.roleDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === 'success') {
          this.getRole()
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
