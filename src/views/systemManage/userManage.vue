<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-input
          v-model="findUser.companyName"
          placeholder="请输入公司名称"
        />
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="findUser.userName"
          placeholder="请输入姓名"
        />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="userTable"
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
      <el-table-column label="密码" v-if="false" min-width="150px" prop="password" align="center"></el-table-column>
      <el-table-column label="公司名称" min-width="150px" prop="companyName" align="center"></el-table-column>
      <el-table-column label="姓名" min-width="150px" prop="userName" align="center"></el-table-column>
      <el-table-column label="账号" min-width="200px" prop="account" align="center"></el-table-column>
      <el-table-column label="电话" min-width="200px" prop="phone" align="center"></el-table-column>
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

    <el-dialog title="添加用户信息" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="userFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="companyName" :label-width="formLabelWidth">
          <el-input v-model="userFormAdd.companyName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account" :label-width="formLabelWidth">
          <el-input v-model="userFormAdd.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="userFormAdd.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="userFormAdd.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userFormAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userFormAdd.email"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="userFormAdd.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitUserAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="userFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="公司名称" prop="companyName" :label-width="formLabelWidth">
          <el-input v-model="userFormEdit.companyName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account" :label-width="formLabelWidth">
          <el-input :disabled="canNotEdit" v-model="userFormEdit.account"></el-input>
        </el-form-item>
<!--        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">-->
<!--          <el-input type="password" v-model="userFormEdit.password"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="姓名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="userFormEdit.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userFormEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userFormEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="userFormEdit.description"></el-input>
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
import { addUser, deleteUser, getUser, updateUser } from '@/network/usersManage'

export default {
  name: 'type',
  data () {
    return {
      userTable: [],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      canNotEdit: true,
      findUser: {
        companyName: '',
        userName: '',
        pagenum: '0', // 当前页数
        pagesize: '10' // 每页条目数
      },
      userFormAdd: {
        account: '',
        companyName: '',
        description: '',
        email: '',
        password: '',
        phone: '',
        userName: '',
        id: ''
      },
      userFormEdit: {
        account: '',
        companyName: '',
        description: '',
        email: '',
        password: '',
        phone: '',
        userName: '',
        id: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '请输入设备类型名称', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '请输入设备类型名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      userAdd: {
        account: '',
        companyName: '',
        description: '',
        email: '',
        password: '',
        phone: '',
        userName: '',
        id: ''
      },
      userUpdate: {
        account: '',
        companyName: '',
        description: '',
        email: '',
        password: '',
        phone: '',
        userName: '',
        id: ''
      },
      userDelete: {
        account: '',
        companyName: '',
        description: '',
        email: '',
        password: '',
        phone: '',
        userName: '',
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
    this.getUser()
  },
  methods: {
    submitUserAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userAdd.account = this.userFormAdd.account
          this.userAdd.companyName = this.userFormAdd.companyName
          this.userAdd.description = this.userFormAdd.description
          this.userAdd.email = this.userFormAdd.email
          this.userAdd.password = this.userFormAdd.password
          this.userAdd.phone = this.userFormAdd.phone
          this.userAdd.userName = this.userFormAdd.userName
          console.log('---this.userAdd--' + JSON.stringify(this.userAdd))
          addUser(this.userAdd).then(res => {
            console.log('-----' + JSON.stringify(res.data))
            if (res.data.code === 200) {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getUser()
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
          this.userUpdate.account = this.userFormEdit.account
          this.userUpdate.companyName = this.userFormEdit.companyName
          this.userUpdate.description = this.userFormEdit.description
          this.userUpdate.email = this.userFormEdit.email
          this.userUpdate.password = this.userFormEdit.password
          this.userUpdate.phone = this.userFormEdit.phone
          this.userUpdate.userName = this.userFormEdit.userName
          this.userUpdate.id = this.userFormEdit.id
          console.log('---this.userUpdate--' + JSON.stringify(this.userUpdate))

          updateUser(this.userUpdate).then(res => {
            console.log('-----' + JSON.stringify(res.data))
            if (res.data.code === 200) {
              this.getUser()
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
    getUser () {
      getUser(this.findUser).then(res => {
        console.log('---this.findUser--' + JSON.stringify(this.findUser))
        console.log('-----' + JSON.stringify(res.data))
        this.userTable = res.data.content
        this.totalCount = res.data.totalElements
      }).catch(res => {
        console.log(res.data)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.findUser.pagesize = val
      console.log('---this.findUser--' + JSON.stringify(this.findUser))
      this.getUser()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.findUser.pagenum = val - 1
      this.dataIndex = (this.findUser.pagenum * this.findUser.pagesize) + 1
      console.log('---this.findUser--' + JSON.stringify(this.findUser))
      this.getUser()
    },
    conditionQuery () {
      console.log('-----' + JSON.stringify(this.findUser))
      this.getUser()
    },
    clearCondition () {
      this.findUser.companyName = ''
      this.findUser.userName = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.userFormEdit.account = val.account
      this.userFormEdit.companyName = val.companyName
      this.userFormEdit.description = val.description
      this.userFormEdit.email = val.email
      this.userFormEdit.password = val.password
      this.userFormEdit.phone = val.phone
      this.userFormEdit.userName = val.userName
      this.userFormEdit.id = val.id
    },
    handleDelete (val) {
      this.userDelete.account = val.account
      this.userDelete.companyName = val.companyName
      this.userDelete.description = val.description
      this.userDelete.email = val.email
      this.userDelete.password = val.password
      this.userDelete.phone = val.phone
      this.userDelete.userName = val.userName
      this.userDelete.id = val.id
      console.log('---this.userDelete--' + JSON.stringify(this.userDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.userDelete--' + JSON.stringify(this.userDelete))
      deleteUser(this.userDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data === '删除成功') {
          this.getUser()
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
