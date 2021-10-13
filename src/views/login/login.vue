<template>
  <div class="login-body" align="center">
    <!--color: String类型。默认'#dedede'。粒子颜色。
    particleOpacity: Number类型。默认0.7。粒子透明度。
    particlesNumber: Number类型。默认80。粒子数量。
    shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
    particleSize: Number类型。默认80。单个粒子大小。
    linesColor: String类型。默认'#dedede'。线条颜色。
    linesWidth: Number类型。默认1。线条宽度。
    lineLinked: 布尔类型。默认true。连接线是否可用。
    lineOpacity: Number类型。默认0.4。线条透明度。
    linesDistance: Number类型。默认150。线条距离。
    moveSpeed: Number类型。默认3。粒子运动速度。
    hoverEffect: 布尔类型。默认true。是否有hover特效。
    hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
    clickEffect: 布尔类型。默认true。是否有click特效。
    clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。-->
    <vue-particles
      color="#fff"
      :particleOpacity="0.1"
      :particlesNumber="130"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particles"
    >
    </vue-particles>
    <el-form ref="form" :rules="loginRules" :model="loginForm" class="login-box">

      <h3 class="login-title">欢迎登录</h3>

      <el-form-item prop="username">
        <el-row>
          <el-col :span='2'>
            <span class="el-icon-s-custom" style="color: white"></span>
          </el-col>
          <el-col :span='22'>
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="password">
        <el-row>
          <el-col :span='2'>
            <span class="el-icon-lock" style="color: white"></span>
          </el-col>
          <el-col :span='22'>
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="handleLogin('form')" style="width: 100%">登录</el-button>
      </el-form-item>
      <div>
        <router-link :to="{ path: '/forgetpwd'}" class="unLogin">
          忘记密码? |
        </router-link>

        <router-link :to="{path: '/register'}">
          <a target="_blank" align="right" class="unLogin">注册账号</a>
        </router-link>
      </div>
    </el-form>
  </div>
</template>
<script>
// import { login } from '../../network/network'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '12345'
      },
      loginRules: {
        username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$router.push({ name: 'Main', params: { name: this.loginForm.username } })
          // const loginInfo = new FormData()
          // loginInfo.append('userName', this.loginForm.username)
          // loginInfo.append('passwd', this.loginForm.password)
          // console.log(loginInfo)
          // login(loginInfo).then(res => {
          //   console.log(res.data.msg)
          //   if (res.data.code === 200) {
          //     sessionStorage.setItem('isLogin', 'true')
          //     // this.$router.push('/main')
          //     this.$router.replace('/main')
          //     this.$store.dispatch('asyncUpdateUser', { name: this.loginForm.username })
          //   } else {
          //     alert(res.data.msg)
          //   }
          // }).catch(res => {
          //   alert(res.data.msg)
          // })

          this.$router.push('/main')
          this.$store.dispatch('asyncUpdateUser', { name: this.loginForm.username })
        } else {
          // this.$message.error('用户名或密码错误')
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
  body{
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
  }
  .login-body {
    position:absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: url("../../assets/background.jpg") no-repeat left top;
    background-size: 100% 100%;
  }
  .particles{
    width: 100%;
    height: 100%;
    left:0;
    top:0;
    position:absolute;
    /* z-index: -1; */
    /*添加渐变背景颜色*/
    /*background-image:radial-gradient(#002953, #041222);*/
  }
  .login-title{
    text-align: center;
    color: white;
    font-size:24px;
  }
  .login-box{
    width: 400px;
    height: 300px;
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
  .loginBtn{
    background-color: transparent;
    color:white;
    font-size: 20px;
    width: 200px;
  }
  .unLogin{
    font-size: 20px;
    color: white;
  }
  a {
    /*去掉原有链接文字下划线*/
    text-decoration: none;
    color: #333333;
  }
  .active {
    /*点击时去掉下划线*/
    text-decoration: none;
    color: dodgerblue;
  }
</style>
