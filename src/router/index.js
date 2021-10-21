import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    // 重定向：初始为login界面
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/register'),
    meta: {
      title: '注册账号'
    }
  },
  {
    path: '/changePwd',
    name: 'changePwd',
    component: () => import('../views/changePwd/changePwd'),
    meta: {
      title: '修改密码',
      requireAuth: true
    }
  },
  {
    path: '/main',
    name: '首页',
    component: () => import('../views/Main'),
    meta: {
      title: '首页',
      requireAuth: true
    },
    children: [
      {
        path: '/',
        // 重定向：初始为当前实验界面
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/dashboard'),
        meta: {
          title: 'Dashboard',
          requireAuth: true
        }
      },
      {
        path: '/users/manage',
        name: '用户管理',
        component: () => import('../views/systemManage/userManage'),
        meta: {
          title: '用户管理',
          requireAuth: true
        }
      },
      {
        path: '/alarm/manage',
        name: '报警管理',
        component: () => import('../views/systemManage/alarmManage'),
        meta: {
          title: '报警管理',
          requireAuth: true
        }
      },
      {
        path: '/device/controller',
        name: '控制器管理',
        component: () => import('../views/deviceManage/controllerManage'),
        meta: {
          title: '控制器管理',
          requireAuth: true
        }
      },
      {
        path: '/device/type',
        name: '设备类型',
        component: () => import('../views/deviceManage/deviceType'),
        meta: {
          title: '设备类型',
          requireAuth: true
        }
      },
      {
        path: '/device/record',
        name: '设备档案',
        component: () => import('../views/deviceManage/deviceRecord'),
        meta: {
          title: '设备档案',
          requireAuth: true
        }
      },
      {
        path: '/route/manage',
        name: '线路管理',
        component: () => import('../views/deviceManage/routeManage'),
        meta: {
          title: '线路管理',
          requireAuth: true
        }
      },
      {
        path: '/site/manage',
        name: '站点管理',
        component: () => import('../views/deviceManage/siteManage'),
        meta: {
          title: '站点管理',
          requireAuth: true
        }
      },
      {
        path: '/device/maintenanceRecord',
        name: '设备维护历史记录',
        component: () => import('../views/deviceManage/maintenanceRecord'),
        meta: {
          title: '设备维护历史记录',
          requireAuth: true
        }
      },
      {
        path: '/command/manage',
        name: '指令管理',
        component: () => import('../views/command/commandManage'),
        meta: {
          title: '指令管理',
          requireAuth: true
        }
      },
      {
        path: '/command/send',
        name: '指令下发',
        component: () => import('../views/command/commandSend'),
        meta: {
          title: '指令下发',
          requireAuth: true
        }
      },
      {
        path: '/operation/record',
        name: '指令操作记录',
        component: () => import('../views/command/operationRecord'),
        meta: {
          title: '指令操作记录',
          requireAuth: true
        }
      },
      {
        path: '/send/record',
        name: '指令发送记录',
        component: () => import('../views/command/sendRecord'),
        meta: {
          title: '指令发送记录',
          requireAuth: true
        }
      },
      {
        path: '/history/record',
        name: '历史数据查询',
        component: () => import('../views/basicAnalysis/historyRecord'),
        meta: {
          title: '历史数据查询',
          requireAuth: true
        }
      },
      {
        path: '/alarm/query',
        name: '报警信息查询',
        component: () => import('../views/basicAnalysis/alarmQuery'),
        meta: {
          title: '报警信息查询',
          requireAuth: true
        }
      },
      {
        path: '/site/alarm',
        name: '站点报警统计',
        component: () => import('../views/basicAnalysis/siteAlarm'),
        meta: {
          title: '站点报警统计',
          requireAuth: true
        }
      },
      {
        path: '/currentexp',
        name: '当前实验',
        component: () => import('../views/currentExperiment/currentExperiment'),
        meta: {
          title: '当前实验',
          requireAuth: true
        }
      },
      {
        path: '/bms',
        name: '电池监控',
        component: () => import('../views/bms/Bms'),
        meta: {
          title: '电池监控',
          requireAuth: true
        }
      },
      {
        path: '/setting',
        name: '工艺设置',
        component: () => import('../views/setting/setting'),
        meta: {
          title: '工艺设置',
          requireAuth: true
        }
      },
      {
        path: '/expdata',
        name: '实验数据',
        component: () => import('../views/expData/expData'),
        meta: {
          title: '实验数据',
          requireAuth: true
        }
      },
      {
        path: '/manage',
        name: '项目管理',
        component: () => import('../views/manage/manage'),
        meta: {
          title: '项目管理'
        }
      },
      {
        path: '/expdata/datarecord',
        name: '数据记录',
        component: () => import('../views/dataRecord/dataRecord'),
        meta: {
          title: '数据记录'
        }
      },
      {
        path: '/battery/details',
        name: '电池组详情',
        component: () => import('../views/details/batteryDetails'),
        meta: {
          title: '电池组详情'
        }
      },
      {
        path: '/sensor/details',
        name: '电池单体详情',
        component: () => import('../views/details/sensorDetails'),
        meta: {
          title: '电池单体详情'
        }
      },
      {
        path: '/test',
        name: '项目测试',
        component: () => import('../views/test'),
        meta: {
          title: '项目测试'
        }
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound'),
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  routes,
  // 网址不出现哈希值#
  mode: 'history',
  linkActiveClass: 'active'
})

// 网址显示title
// router.beforeEach((to, from, next) => {
//   document.title = to.matched[0].meta.title // 显示标题
//   // next()
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (sessionStorage.getItem('isLogin') === 'true') {
//       next()
//     } else {
//       // 未登录，跳转到登录页面
//       next('/login')
//     }
//   } else {
//     // if (sessionStorage.getItem('isLogin') === 'true') {
//     //   next('/menu')
//     // } else {
//     //   next()
//     // }
//     next()
//   }
// })
export default router
