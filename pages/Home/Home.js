// pages/Home/Home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "/pages/index/index"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token', //仅为示例，并非真实的接口地址
    //   data: {
    //     grant_type: 'client_credential',
    //     appid: 'wx2eca52e5d8a5a08d',
    //     secret: '08d44e61765069d109b9b3ec2a5afb00'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       console.log(res.code)
    //     } else {
    //       console.log('登录失败！')
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})