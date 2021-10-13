<template>
    <div class="register-wrapper" align="center">
     <div id="register">
       <el-form :model="registerForm" :rules="registerRules" ref="ruleForm" class="register-box">

         <p class="register-title">欢迎注册</p>

         <el-form-item prop="user_name">
           <el-row>
             <el-col :span='2'>
               <span class="el-icon-s-custom" style="color: white"></span>
             </el-col>
             <el-col :span='22'>
               <el-input v-model="registerForm.user_name" placeholder="请输入用户名"></el-input>
             </el-col>
           </el-row>
         </el-form-item>

         <el-form-item prop="user_password">
           <el-row>
             <el-col :span='2'>
               <span class="el-icon-lock" style="color: white"></span>
             </el-col>
             <el-col :span='22'>
               <el-input v-model="registerForm.user_password" placeholder="请输入密码" type="password"></el-input>
             </el-col>
           </el-row>
         </el-form-item>

         <el-form-item prop="checkPass">
           <el-row>
             <el-col :span='2'>
               <span class="el-icon-lock" style="color: white"></span>
             </el-col>
             <el-col :span='22'>
               <el-input v-model="registerForm.checkPass" placeholder="请再次输入密码" type="password"></el-input>
             </el-col>
           </el-row>
         </el-form-item>

         <el-form-item>
           <el-button type="primary" style="width:100%;" class="registerBtn" @click="handleRegister('ruleForm')">注册</el-button>
         </el-form-item>
         <div>
           <router-link :to="{ path: '/login'}" class="toLogin" >
             已有账号？立即登录
           </router-link>
         </div>
       </el-form>
     </div>
    </div>
</template>

<script>
import { register } from '../../network/network'
export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        user_name: '',
        user_password: '',
        checkPass: ''
      },
      registerRules: {
        user_name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        user_password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const registerInfo = new FormData()
          registerInfo.append('userName', this.registerForm.user_name)
          registerInfo.append('passwd', this.registerForm.user_password)
          console.log(registerInfo)
          if (this.registerForm.user_password === this.registerForm.checkPass) {
            register(registerInfo).then(res => {
              alert(res.data.msg)
              if (res.data.code === 200) {
                this.$router.push('/login')
              }
            }).catch(res => {
              alert(res.data.msg)
            })
          } else {
            alert('两次输入的密码不同！')
          }
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
  .register-wrapper{
    position:relative;
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    background: url("../../assets/background.jpg") no-repeat left top;
    background-size: 100% 100%;
  }
  .register-title{
    text-align: center;
    color: white;
    font-size:24px;
  }
  .register-box{
    width: 400px;
    height: 370px;
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
  .registerBtn{
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
