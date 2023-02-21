// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const that = this
    // 登录
    wx.login({
      success: res => {
        //console.log(res.code)
        //发送 res.code 到后台换取 userId,token
        wx.request({
          url: 'http://43.139.33.166/api/user/info',
          data: res.code,
          method: 'POST',
          success: (result) => { //成功以后将userId跟token存到全局变量
            //console.log("Get openID success!")
            //console.log(result)
            that.globalData.userId = result.data.data.id
            that.globalData.token = result.data.data.token

          },
          fail: (res) => {
            console.log("fail")
            console.log(res)
          },
          complete: (res) => {},
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    onload: 0,
    avatarUrl: "",
    nickName: "",
    selected: 0, //通过selected的值来控制 tabbar 的切换，0是'主页'，1是'招新'，2是'我的'
    userId: " ", //将登陆后获取的userId跟token放在全局变量
    token: " ",
    progress_status: 0, //获取进度的状态，0代表未发送请求；1代表已发送请求，直接从全局变量中取progress对象中的值来用
    progress: { //进度，从后台请求回来放到全局变量
      write: null, //笔试
      interview: null, //面试
      firstItem: null, //一轮考核
      secondItem: null //二轮考核
    },
    finalResult: " ", //最终结果，通过or未通过
    information_status: 0, //获取个人资料的状态，0代表未发送请求；1代表已发送请求，直接从全局变量中取information对象中的值来用
    information: { //个人资料页的值，从后台请求回来放到全局变量
      stuNumber: "",
      userName: "",
      academy: "",
      direction: "",
      phoneNum: ""
    }
  },

})