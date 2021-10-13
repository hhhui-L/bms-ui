<template>
    <div class="change-wrapper" align="center">
      <div id="change">
        <el-form :model="changeForm" :rules="changeRules" ref="ruleForm" class="change-box">

          <p class="change-title">修改密码</p>

          <el-form-item prop="user_name">
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-s-custom" style="color: white"></span>
              </el-col>
              <el-col :span='22'>
                <el-input v-model="changeForm.user_name" placeholder="请输入用户名"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="old_password">
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-lock" style="color: white"></span>
              </el-col>
              <el-col :span='22'>
                <el-input v-model="changeForm.old_password" placeholder="请输入原密码" type="password"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="new_password">
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-lock" style="color: white"></span>
              </el-col>
              <el-col :span='22'>
                <el-input v-model="changeForm.new_password" placeholder="请输入新密码" type="password"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="checkPass">
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-lock" style="color: white"></span>
              </el-col>
              <el-col :span='22'>
                <el-input v-model="changeForm.checkPass" placeholder="请再次输入新密码" type="password"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width:100%;" class="sureBtn" @click="changePwd('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import { changePassword } from '../../network/network'

export default {
  name: 'changePwd',
  data () {
    return {
      changeForm: {
        user_name: '',
        old_password: '',
        new_password: '',
        checkPass: ''
      },
      changeRules: {
        user_name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        old_password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changePwd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const changePwdInfo = new FormData()
          changePwdInfo.append('username', this.changeForm.user_name)
          changePwdInfo.append('oldpassword', this.changeForm.old_password)
          changePwdInfo.append('newpassword', this.changeForm.new_password)
          console.log(changePwdInfo)
          changePassword(changePwdInfo).then(res => {
            alert(res.data.msg)
            if (res.data.code === 200) {
              this.$router.push('/main')
            }
          }).catch(res => {
            alert(res.data.msg)
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  body{
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
  }
  .change-wrapper{
    position:relative;
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    background: url("../../assets/background.jpg") no-repeat left top;
    background-size: 100% 100%;
  }
  .change-title{
    text-align: center;
    color: white;
    font-size:24px;
  }
  .change-box{
    width: 430px;
    height: 380px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border: 1px solid #DCDFE6;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px #DCDFE6;
    display: inline-block;
    background: transparent;
  }
  .sureBtn{
    background-color: transparent;
    color:white;
    font-size: 20px;
    width: 200px;
  }
  .toLogin{
    font-size: 20px;
    color: white;
  }
  a {
    /*去掉原有链接文字下划线*/
    text-decoration: none;
    color: dodgerblue;
  }
  .active {
    /*点击时去掉下划线*/
    text-decoration: none;
    color: dodgerblue;
  }
</style>
