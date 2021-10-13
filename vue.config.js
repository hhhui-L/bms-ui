const path = require('path')
const port = 8080
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist',
  indexPath: 'index.html',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // publicPath: './',
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  // 部署时移除 devServer
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {
    //   "/regcal-api": {
    //     target:
    //       process.env.NODE_ENV === "development"
    //         ? "http://服务器ip:服务器port/"
    //         : "http://生成环境的服务器ip:生成环境的服务器port/",
    //     changeOrigin: true, //允许跨域
    //     pathRewrite: {
    //       "^/regcal-api": "/regcal-back"
    //     }
    //   }
    // }
  },
  // 打包设置
  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src') // 用刚才定义的方法，实现@关键字代表src目录
      }
    }
  }
}
