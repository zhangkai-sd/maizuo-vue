module.exports = {
  publicPath: '/vue-maizuo',
  devServer: { // 关闭客户端的报错遮罩层
    overlay: {
      warnings: true,
      errors: true
    },
    open: true, // 自动开启浏览器
    port: 8000, // 随便改端口号
    proxy: { // 配置代理  解决前端浏览器的跨域问题
      '/info': {
        target: 'http://118.190.200.25:3000', // 目标请求的域名地址
        changeOrigin: true, // 是否改变
        pathRewrite: { // 重写地址
          '^/info': ''
        }
      }
    }
  },
  lintOnSave: false // 直接关闭eslint检查
}
