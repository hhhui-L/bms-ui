<template>
    <div style="height: 100%">
      <el-container style="height: 100%">
<!--        #545c64-->
        <el-aside class="el-aside" width="isCollapse?'64px':'200px'" style="background-color: #1c2431;padding: 0 0 0 0">
<!--          <div style="height: 60px;text-align: center;color: white">蓄电池智能在线监测云平台</div>-->
          <div class="toggle-button" @click="toggleCollapse" style="height: 35px;text-align: center">|||</div>
          <el-menu class="el-menu-vertical-demo"
                   @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse"
                   :default-active="this.$router.path"
                   router
                   background-color="#1c2431"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   border-right: none
          >
            <el-menu-item index="/dashboard">
              <i class="el-icon-s-grid"></i>
              <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span slot="title">系统管理</span>
              </template>
              <el-menu-item index="/users/manage">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>

            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span slot="title">设备管理</span>
              </template>
              <el-menu-item index="/device/controller">
                <i class="el-icon-s-ticket"></i>
                <span slot="title">控制器管理</span>
              </el-menu-item>
              <el-menu-item index="/device/type">
                <i class="el-icon-s-tools"></i>
                <span slot="title">设备类型</span>
              </el-menu-item>
              <el-menu-item index="/device/record">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">设备档案</span>
              </el-menu-item>
              <el-menu-item index="/route/manage">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">线路管理</span>
              </el-menu-item>
              <el-menu-item index="/site/manage">
                <i class="el-icon-coordinate"></i>
                <span slot="title">站点管理</span>
              </el-menu-item>
              <el-menu-item index="/device/maintenanceRecord">
                <i class="el-icon-document"></i>
                <span slot="title">设备维护历史记录</span>
              </el-menu-item>
              <el-menu-item index="/currentexp">
                <i class="el-icon-guide"></i>
                <span slot="title">当前实验</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">设备控制</span>
              </template>
              <el-menu-item index="/command/manage">
                <i class="el-icon-chat-dot-round"></i>
                <span slot="title">指令管理</span>
              </el-menu-item>
              <el-menu-item index="/command/send">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">指令下发</span>
              </el-menu-item>
              <el-menu-item index="/operation/record">
                <i class="el-icon-s-order"></i>
                <span slot="title">指令操作记录</span>
              </el-menu-item>
              <el-menu-item index="/send/record">
                <i class="el-icon-s-claim"></i>
                <span slot="title">指令发送记录</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">基础分析</span>
              </template>
              <el-menu-item index="/history/record">
                <i class="el-icon-data-line"></i>
                <span slot="title">历史数据查询</span>
              </el-menu-item>
              <el-menu-item index="/alarm/query">
                <i class="el-icon-star-on"></i>
                <span slot="title">报警信息查询</span>
              </el-menu-item>
              <el-menu-item index="/site/alarm">
                <i class="el-icon-star-off"></i>
                <span slot="title">站点报警统计</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/bms">
              <i class="el-icon-s-data"></i>
              <span slot="title">电池监测</span>
            </el-menu-item>
            <el-menu-item index="/setting">
              <i class="el-icon-document"></i>
              <span slot="title">工艺设置</span>
            </el-menu-item>
            <el-menu-item index="/expdata">
              <i class="el-icon-setting"></i>
              <span slot="title">实验数据</span>
            </el-menu-item>
            <el-menu-item index="/battery/details">
              <i class="el-icon-setting"></i>
              <span slot="title">电池组详情</span>
            </el-menu-item>
            <el-menu-item index="/sensor/details">
              <i class="el-icon-setting"></i>
              <span slot="title">电池单体详情</span>
            </el-menu-item>
            <el-menu-item index="/test">
              <i class="el-icon-setting"></i>
              <span slot="title">test</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      <el-container>
          <el-header style="background-color: #1c2431">
            <div>
              <el-breadcrumb separator-class="el-icon-arrow-right" style="float:left;margin-top: 20px;margin-bottom: 19px;color: white">
                <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
<!--            <div style="float: left;margin-left: 360px">电池监测云平台</div>-->
            <div style="float: right">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px;font-size: 14px;color: white"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="color: white">{{$store.getters.getUser.name}}</span>
            </div>
          </el-header>
          <el-main style="padding: 0">
            <router-view/>
          </el-main>
      </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false,
      breadList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    changePwd () {
      this.$router.push('/changePwd')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.name)
      // const first = matched[0]
      this.breadList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style>
  body, html{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .el-header {
    /*background-color: #EBEEF5;*/
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 0 0 0 0;
    line-height: 60px;
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
  .toggle-button {
    /*#4a5064*/
    background-color: #1c2431;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-breadcrumb  /deep/  .el-breadcrumb__inner
  {
    color: white !important;
  }
  .el-icon-arrow-right {
    color: white;
  }
  .el-menu {
    border-right:0!important;
  }
</style>
