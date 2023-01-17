// pages/Information/Information.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    stuNumber: "",
    academy: "",
    direction: "",
    phoneNum: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this
    if (app.globalData.information_status === 0) { //information_status等于0时代表未发送过请求，需要发送请求获取数据；否则直接从全局变量中取值
      wx.request({ //发送请求获取个人信息
        url: 'http://127.0.0.1:4523/m1/1875832-0-default/user/info/1',
        data: {
          "userId": app.globalData.userId,
          "token": app.globalData.token
        },
        method: 'GET',
        success: (result) => {
          //console.log("Get openID success!")
          console.log(result)

          app.globalData.information.username = result.data.data.username
          app.globalData.information.stuNumber = result.data.data.stuNumber
          app.globalData.information.academy = result.data.data.academy
          app.globalData.information.direction = result.data.data.direction
          app.globalData.information.phoneNum = result.data.data.phoneNum

          app.globalData.information_status = 1

          that.setData({
            username: result.data.data.username,
            stuNumber: result.data.data.stuNumber,
            academy: result.data.data.academy,
            direction: result.data.data.direction,
            phoneNum: result.data.data.phoneNum
          })
        },
        fail: (res) => {
          console.log("fail")
          console.log(res)
        },
        complete: (res) => {},
      })
    } else {
      that.setData({
        username: app.globalData.information.username,
        stuNumber: app.globalData.information.stuNumber,
        academy: app.globalData.information.academy,
        direction: app.globalData.information.direction,
        phoneNum: app.globalData.information.phoneNum
      })
    }

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