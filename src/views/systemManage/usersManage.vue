<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
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
        <el-input
          v-model="queryExpHisBean.battery_model"
          placeholder="请输入姓名"
        />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="usersTable"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="公司名称" min-width="150px" prop="companyName"></el-table-column>
      <el-table-column label="账号" min-width="150px" prop="account"></el-table-column>
      <el-table-column label="姓名" min-width="150px" prop="userName"></el-table-column>
      <el-table-column label="电话" min-width="150px" prop="phone"></el-table-column>
      <el-table-column label="邮箱" min-width="150px" prop="email"></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="userForm" :rules="rules" ref="ruleForm">
        <el-form-item label="公司" prop="companyName" :label-width="formLabelWidth">
          <el-input v-model="userForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account" :label-width="formLabelWidth">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="userForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
<!--        dialogFormVisible = false-->
        <el-button type="primary" @click="submitUserInfo('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <!--    <el-pagination-->
<!--      :current-page="currentPage"-->
<!--      :page-sizes="pageSizeList"-->
<!--      :page-size="pageSize"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="totalCount"-->
<!--      align="right"-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--    />-->
  </div>
</template>

<script>
import { addUser } from '../../network/network'
export default {
  name: 'usersManage',
  data () {
    return {
      usersTable: [],
      dialogFormVisible: false,
      userForm: {
        companyName: '',
        account: '',
        password: '',
        userName: '',
        phone: '',
        email: '',
        description: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '备注', trigger: 'blur' }
        ]
      },
      formLabelWidth: '60px',

      currentPage: 1,
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100],
      totalCount: 400,
      currentPageCount: 0,
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
      }]
    }
  },
  methods: {
    submitUserInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userInfo = new FormData()
          userInfo.append('companyName', this.userForm.companyName)
          userInfo.append('account', this.userForm.account)
          userInfo.append('password', this.userForm.password)
          userInfo.append('userName', this.userForm.userName)
          userInfo.append('phone', this.userForm.phone)
          userInfo.append('email', this.userForm.email)
          userInfo.append('description', this.userForm.description)
          console.log(userInfo)
          addUser(userInfo).then(res => {
            // 具体逻辑
          }).catch(res => {
            // 具体逻辑
          })
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    conditionQuery () {
      // 逻辑
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
